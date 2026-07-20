import Busboy from "busboy";
import { Readable } from "node:stream";

const boundary = "order-boundary";
const body = [
  `--${boundary}`,
  `Content-Disposition: form-data; name="file"; filename="first.pdf"`,
  "Content-Type: application/pdf",
  "",
  "%PDF-1.7",
  `--${boundary}`,
  `Content-Disposition: form-data; name="description"`,
  "",
  "arrives after file",
  `--${boundary}--`,
  ""
].join("\r\n");

const events: string[] = [];
const parser = Busboy({
  headers: {
    "content-type": `multipart/form-data; boundary=${boundary}`
  }
});

parser.on("file", (_name, file) => {
  events.push("file");
  file.resume();
});

parser.on("field", () => {
  events.push("field");
});

parser.on("finish", () => {
  console.log(events);
});

Readable.from(Buffer.from(body)).pipe(parser);
