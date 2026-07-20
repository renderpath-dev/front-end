import { createWriteStream } from "node:fs";
import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const directory = await mkdtemp(path.join(tmpdir(), "upload-cleanup-"));
const target = path.join(directory, "failed.tmp");

const failAfterFirstChunk = new Transform({
  transform(chunk: Buffer, _encoding, callback) {
    callback(null, chunk);
    this.destroy(new Error("simulated stream failure"));
  }
});

try {
  await pipeline(Readable.from([Buffer.from("abc"), Buffer.from("def")]), failAfterFirstChunk, createWriteStream(target));
} catch (error) {
  await rm(target, { force: true });
  console.log(error instanceof Error ? error.message : "unknown error");
}

await stat(target).catch((error: NodeJS.ErrnoException) => console.log(error.code));
await rm(directory, { recursive: true, force: true });
