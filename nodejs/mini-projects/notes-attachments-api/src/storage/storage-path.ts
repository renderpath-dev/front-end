import path from "node:path";
import { HttpError } from "../shared/errors/http-error.js";

export function resolveStoragePath(root: string, storageKey: string): string {
  const rootPath = path.resolve(root);
  const candidatePath = path.resolve(rootPath, storageKey);
  const relativePath = path.relative(rootPath, candidatePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new HttpError(400, "Storage key escapes the storage root.", "STORAGE_KEY_INVALID");
  }

  return candidatePath;
}
