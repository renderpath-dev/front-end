import type { Readable } from "node:stream";

export type StoredObject = {
  storageKey: string;
  byteSize: number;
};

export type ObjectStoreStat = {
  byteSize: number;
  updatedAt: Date;
};

export interface ObjectStore {
  putFile(input: { sourcePath: string; storageKey: string }): Promise<StoredObject>;
  createReadStream(storageKey: string): Readable;
  stat(storageKey: string): Promise<ObjectStoreStat>;
  deleteFile(storageKey: string): Promise<void>;
}
