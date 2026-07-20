import path from "node:path";

export function safeOriginalName(rawName: string | undefined): string {
  const basename = path.basename(rawName ?? "upload.bin").normalize("NFC");
  const sanitized = basename.replace(/[^A-Za-z0-9._ -]/g, "_").slice(0, 160);
  return sanitized.length > 0 ? sanitized : "upload.bin";
}

console.log(safeOriginalName("../../secret.txt"));
console.log(safeOriginalName("résumé.pdf"));
