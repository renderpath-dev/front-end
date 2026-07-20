import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

let byteSize = 0;
const byteCounter = new Transform({
  transform(chunk: Buffer, _encoding, callback) {
    byteSize += chunk.length;
    callback(null, chunk);
  }
});

await pipeline(Readable.from([Buffer.from("abc"), Buffer.from("def")]), byteCounter);
console.log({ byteSize });
