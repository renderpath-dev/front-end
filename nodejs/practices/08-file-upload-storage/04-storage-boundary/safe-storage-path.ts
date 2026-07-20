import path from "node:path";

export function resolveSafeStoragePath(root: string, storageKey: string): string {
  const rootPath = path.resolve(root);
  const candidate = path.resolve(rootPath, storageKey);
  const relative = path.relative(rootPath, candidate);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Storage key escapes the storage root");
  }

  return candidate;
}

console.log(resolveSafeStoragePath("./storage", "owners/u1/file.png"));
try {
  console.log(resolveSafeStoragePath("./storage", "../secret.txt"));
} catch (error) {
  console.log(error instanceof Error ? error.message : "unknown error");
}
