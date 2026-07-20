import path from "node:path";

const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".pdf"]);

export function assertAllowedExtension(filename: string): string {
  const extension = path.extname(filename).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    throw new Error("Unsupported file extension");
  }
  return extension;
}

console.log(assertAllowedExtension("report.PDF"));
