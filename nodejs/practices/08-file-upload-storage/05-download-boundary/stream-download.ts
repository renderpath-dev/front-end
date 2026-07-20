import { createReadStream, createWriteStream } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const directory = await mkdtemp(path.join(tmpdir(), "download-stream-"));
const source = path.join(directory, "stored.bin");
const target = path.join(directory, "response.bin");

await writeFile(source, Buffer.from("download bytes"));
await pipeline(createReadStream(source), createWriteStream(target));
console.log("streamed");
await rm(directory, { recursive: true, force: true });
