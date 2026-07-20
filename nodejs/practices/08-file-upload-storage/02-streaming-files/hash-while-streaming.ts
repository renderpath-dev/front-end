import { createHash } from "node:crypto";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const hash = createHash("sha256");
const hashing = new Transform({
  transform(chunk: Buffer, _encoding, callback) {
    hash.update(chunk);
    callback(null, chunk);
  }
});

await pipeline(Readable.from([Buffer.from("file bytes")]), hashing);
console.log(hash.digest("hex"));
