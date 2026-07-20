import Busboy from "busboy";
import { Readable } from "node:stream";

const boundary = "demo-boundary";
const body = [
  `--${boundary}`,
  `Content-Disposition: form-data; name="title"`,
  "",
  "avatar",
  `--${boundary}`,
  `Content-Disposition: form-data; name="file"; filename="avatar.png"`,
  "Content-Type: image/png",
  "",
  "png-bytes",
  `--${boundary}--`,
  ""
].join("\r\n");

const parser = Busboy({
  headers: {
    "content-type": `multipart/form-data; boundary=${boundary}`
  }
});

parser.on("field", (name, value) => {
  console.log({ event: "field", name, value });
});

parser.on("file", (name, file, info) => {
  const chunks: Buffer[] = [];
  file.on("data", (chunk: Buffer) => chunks.push(chunk));
  file.on("end", () => {
    console.log({
      event: "file",
      name,
      filename: info.filename,
      mimeType: info.mimeType,
      bytes: Buffer.concat(chunks).length
    });
  });
});

Readable.from(Buffer.from(body)).pipe(parser);
