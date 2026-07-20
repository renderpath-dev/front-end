import { createWriteStream } from "node:fs";
import { createHash } from "node:crypto";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import Busboy from "busboy";
import type { Request } from "express";
import { HttpError } from "../shared/errors/http-error.js";
import { createTempUploadPath, ensureUploadDirectories, removeTempFile } from "../storage/temp-files.js";
import { safeOriginalName } from "./filename.js";
import { uploadLimits } from "./upload-limits.js";
import type { ParsedMultipartUpload, ParsedUploadFile } from "./upload-types.js";

type BusboyFileStream = NodeJS.ReadableStream & {
  truncated?: boolean;
  resume(): void;
  on(event: "limit", listener: () => void): BusboyFileStream;
};

export async function parseMultipartUpload(request: Request): Promise<ParsedMultipartUpload> {
  await ensureUploadDirectories();

  const contentType = request.headers["content-type"];
  if (typeof contentType !== "string" || !contentType.toLowerCase().startsWith("multipart/form-data;") || !contentType.toLowerCase().includes("boundary=")) {
    throw new HttpError(415, "Request must use multipart/form-data with a boundary.", "MULTIPART_REQUIRED");
  }

  return new Promise((resolve, reject) => {
    const tempPaths: string[] = [];
    const fields: Record<string, string> = {};
    let parsedFile: ParsedUploadFile | undefined;
    let writeTask: Promise<void> | undefined;
    let settled = false;
    let fileCount = 0;

    const fail = (error: unknown): void => {
      if (settled) {
        return;
      }
      settled = true;
      for (const tempPath of tempPaths) {
        void removeTempFile(tempPath);
      }
      reject(error);
    };

    const parser = Busboy({
      headers: request.headers,
      limits: uploadLimits
    });

    parser.on("field", (name, value) => {
      fields[name] = value;
    });

    parser.on("file", (fieldName, file, info) => {
      const uploadStream = file as BusboyFileStream;
      fileCount += 1;

      if (fieldName !== "file" || fileCount > 1) {
        uploadStream.resume();
        fail(new HttpError(400, "Exactly one file field named file is required.", "UPLOAD_FILE_FIELD_INVALID"));
        return;
      }

      const tempPath = createTempUploadPath();
      tempPaths.push(tempPath);
      const hash = createHash("sha256");
      let byteSize = 0;
      let truncated = false;

      uploadStream.on("limit", () => {
        truncated = true;
      });

      const meter = new Transform({
        transform(chunk: Buffer, _encoding, callback) {
          byteSize += chunk.length;
          hash.update(chunk);
          callback(null, chunk);
        }
      });

      writeTask = pipeline(uploadStream, meter, createWriteStream(tempPath))
        .then(() => {
          parsedFile = {
            fieldName,
            originalName: safeOriginalName(info.filename),
            declaredMimeType: info.mimeType,
            encoding: info.encoding,
            tempPath,
            byteSize,
            sha256: hash.digest("hex"),
            truncated: truncated || uploadStream.truncated === true
          };
        })
        .catch(fail);
    });

    parser.on("filesLimit", () => fail(new HttpError(413, "Only one file is allowed.", "UPLOAD_FILES_LIMIT")));
    parser.on("fieldsLimit", () => fail(new HttpError(413, "Too many text fields.", "UPLOAD_FIELDS_LIMIT")));
    parser.on("partsLimit", () => fail(new HttpError(413, "Too many multipart parts.", "UPLOAD_PARTS_LIMIT")));
    parser.on("error", fail);

    request.on("aborted", () => fail(new HttpError(499, "Upload request was aborted.", "UPLOAD_ABORTED")));

    parser.on("finish", async () => {
      if (settled) {
        return;
      }

      try {
        await writeTask;

        if (!parsedFile) {
          throw new HttpError(400, "A file field named file is required.", "UPLOAD_FILE_REQUIRED");
        }

        if (parsedFile.truncated) {
          throw new HttpError(413, "Uploaded file is too large.", "UPLOAD_FILE_TOO_LARGE");
        }

        settled = true;
        resolve({ fields, file: parsedFile });
      } catch (error) {
        fail(error);
      }
    });

    request.pipe(parser);
  });
}
