import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const controller = new AbortController();
const slowTransform = new Transform({
  transform(chunk: Buffer, _encoding, callback) {
    setTimeout(() => callback(null, chunk), 50);
  }
});

setTimeout(() => controller.abort(), 10);

try {
  await pipeline(Readable.from([Buffer.alloc(1024)]), slowTransform, { signal: controller.signal });
} catch (error) {
  console.log(error instanceof Error ? error.name : "unknown error");
}
