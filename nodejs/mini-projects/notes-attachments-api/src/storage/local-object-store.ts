import { createReadStream } from "node:fs";
import { copyFile, mkdir, rm, stat as fsStat } from "node:fs/promises";
import path from "node:path";
import { config } from "../config/env.js";
import type { ObjectStore, ObjectStoreStat, StoredObject } from "./object-store.js";
import { resolveStoragePath } from "./storage-path.js";

export class LocalObjectStore implements ObjectStore {
  constructor(private readonly root: string) {}

  async putFile(input: { sourcePath: string; storageKey: string }): Promise<StoredObject> {
    const targetPath = resolveStoragePath(this.root, input.storageKey);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(input.sourcePath, targetPath);
    const stat = await fsStat(targetPath);
    return {
      storageKey: input.storageKey,
      byteSize: stat.size
    };
  }

  createReadStream(storageKey: string) {
    return createReadStream(resolveStoragePath(this.root, storageKey));
  }

  async stat(storageKey: string): Promise<ObjectStoreStat> {
    const stat = await fsStat(resolveStoragePath(this.root, storageKey));
    return {
      byteSize: stat.size,
      updatedAt: stat.mtime
    };
  }

  async deleteFile(storageKey: string): Promise<void> {
    await rm(resolveStoragePath(this.root, storageKey), { force: true });
  }
}

export const objectStore = new LocalObjectStore(config.STORAGE_ROOT);
