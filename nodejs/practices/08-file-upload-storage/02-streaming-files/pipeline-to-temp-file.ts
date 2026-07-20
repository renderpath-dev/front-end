import { createReadStream, createWriteStream } from "node:fs";
import { mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const directory = await mkdtemp(path.join(tmpdir(), "upload-pipeline-"));
const source = path.join(directory, "source.bin");
const target = path.join(directory, "temp-upload.bin");

await writeFile(source, Buffer.alloc(1024, 7));
await pipeline(createReadStream(source), createWriteStream(target));

console.log((await stat(target)).size);
await rm(directory, { recursive: true, force: true });
