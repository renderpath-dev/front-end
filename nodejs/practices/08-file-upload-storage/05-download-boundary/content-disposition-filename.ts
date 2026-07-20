export function contentDispositionAttachment(originalName: string): string {
  const fallbackName = originalName.replace(/[^A-Za-z0-9._-]/g, "_");
  const encodedName = encodeURIComponent(originalName).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
  return `attachment; filename="${fallbackName}"; filename*=UTF-8''${encodedName}`;
}

console.log(contentDispositionAttachment("quarterly report.pdf"));
