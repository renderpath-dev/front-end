import path from "node:path";

const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".pdf"]);

export function safeOriginalName(rawName: string | undefined): string {
  const basename = path.basename(rawName ?? "upload.bin").normalize("NFC");
  const sanitized = basename.replace(/[^A-Za-z0-9._ -]/g, "_").slice(0, 160);
  return sanitized.length > 0 ? sanitized : "upload.bin";
}

export function allowedExtension(filename: string): ".png" | ".jpg" | ".jpeg" | ".pdf" {
  const extension = path.extname(filename).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    throw new Error("Unsupported file extension.");
  }
  return extension as ".png" | ".jpg" | ".jpeg" | ".pdf";
}

export function contentDispositionAttachment(originalName: string): string {
  const fallbackName = originalName.replace(/[^A-Za-z0-9._-]/g, "_");
  const encodedName = encodeURIComponent(originalName).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
  return `attachment; filename="${fallbackName}"; filename*=UTF-8''${encodedName}`;
}
