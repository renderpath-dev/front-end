import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export function createHashingTransform(onChunk: (chunk: Buffer) => void): Transform {
  const hash = createHash("sha256");
  return new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      hash.update(chunk);
      onChunk(chunk);
      callback(null, chunk);
    },
    final(callback) {
      this.emit("sha256", hash.digest("hex"));
      callback();
    }
  });
}

export async function hashFile(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  await pipeline(
    createReadStream(filePath),
    new Transform({
      transform(chunk: Buffer, _encoding, callback) {
        hash.update(chunk);
        callback(null, chunk);
      }
    })
  );
  return hash.digest("hex");
}
