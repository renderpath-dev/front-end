import { createReadStream } from "node:fs";
import { copyFile, mkdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

type StoredObject = {
  storageKey: string;
  byteSize: number;
};

class LocalObjectStore {
  constructor(private readonly root: string) {}

  async putFile(sourcePath: string, storageKey: string): Promise<StoredObject> {
    const targetPath = path.resolve(this.root, storageKey);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
    return { storageKey, byteSize: (await stat(targetPath)).size };
  }

  createReadStream(storageKey: string) {
    return createReadStream(path.resolve(this.root, storageKey));
  }
}

const root = path.join(tmpdir(), "local-object-store-demo");
const source = path.join(root, "source.bin");
await mkdir(root, { recursive: true });
await writeFile(source, Buffer.from("stored bytes"));

const store = new LocalObjectStore(root);
console.log(await store.putFile(source, "owners/u1/file.bin"));
store.createReadStream("owners/u1/file.bin").destroy();
await rm(root, { recursive: true, force: true });
