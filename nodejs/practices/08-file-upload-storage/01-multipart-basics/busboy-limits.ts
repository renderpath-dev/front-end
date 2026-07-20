import Busboy from "busboy";
import { Readable } from "node:stream";

const boundary = "limit-boundary";
const body = [
  `--${boundary}`,
  `Content-Disposition: form-data; name="file"; filename="large.bin"`,
  "Content-Type: application/octet-stream",
  "",
  "abcdef",
  `--${boundary}--`,
  ""
].join("\r\n");

const parser = Busboy({
  headers: {
    "content-type": `multipart/form-data; boundary=${boundary}`
  },
  limits: {
    fileSize: 3,
    files: 1,
    fields: 2,
    parts: 3
  }
});

parser.on("file", (_name, file) => {
  file.on("limit", () => console.log("fileSize limit reached"));
  file.resume();
});

parser.on("filesLimit", () => console.log("files limit reached"));
parser.on("fieldsLimit", () => console.log("fields limit reached"));
parser.on("partsLimit", () => console.log("parts limit reached"));
parser.on("finish", () => console.log("parser finished"));

Readable.from(Buffer.from(body)).pipe(parser);
