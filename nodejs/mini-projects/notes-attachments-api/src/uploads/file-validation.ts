import { fileTypeFromFile } from "file-type";
import { HttpError } from "../shared/errors/http-error.js";
import { allowedExtension } from "./filename.js";
import type { ValidatedUploadFile, ParsedUploadFile } from "./upload-types.js";

const detectedMimeByExtension = new Map<string, Set<string>>([
  [".png", new Set(["image/png"])],
  [".jpg", new Set(["image/jpeg"])],
  [".jpeg", new Set(["image/jpeg"])],
  [".pdf", new Set(["application/pdf"])]
]);

export async function validateUploadedFile(file: ParsedUploadFile): Promise<ValidatedUploadFile> {
  const extension = toUploadExtension(file.originalName);
  const detected = await fileTypeFromFile(file.tempPath);

  if (!detected) {
    throw new HttpError(415, "File type could not be detected.", "FILE_TYPE_UNKNOWN");
  }

  const allowedMimeTypes = detectedMimeByExtension.get(extension);
  if (!allowedMimeTypes?.has(detected.mime)) {
    throw new HttpError(415, "File extension and detected file type do not match.", "FILE_TYPE_MISMATCH", {
      extension,
      declaredMimeType: file.declaredMimeType,
      detectedMimeType: detected.mime
    });
  }

  return {
    ...file,
    extension,
    detectedMimeType: detected.mime as ValidatedUploadFile["detectedMimeType"]
  };
}

function toUploadExtension(filename: string): ValidatedUploadFile["extension"] {
  try {
    return allowedExtension(filename);
  } catch {
    throw new HttpError(415, "File extension is not allowed.", "FILE_EXTENSION_UNSUPPORTED");
  }
}
