export function createDownloadHeaders(input: {
  mimeType: string;
  byteSize: number;
  originalName: string;
  sha256: string;
}): Record<string, string> {
  const fallbackName = input.originalName.replace(/[^A-Za-z0-9._-]/g, "_");
  return {
    "Content-Type": input.mimeType,
    "Content-Length": String(input.byteSize),
    "Content-Disposition": `attachment; filename="${fallbackName}"`,
    "ETag": `"sha256-${input.sha256}"`,
    "X-Content-Type-Options": "nosniff"
  };
}

console.log(createDownloadHeaders({
  mimeType: "application/pdf",
  byteSize: 512,
  originalName: "report.pdf",
  sha256: "a".repeat(64)
}));
