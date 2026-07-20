import { createHash } from "node:crypto";

export function etagFromBytes(bytes: Buffer): string {
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  return `"sha256-${sha256}"`;
}

console.log(etagFromBytes(Buffer.from("download bytes")));
