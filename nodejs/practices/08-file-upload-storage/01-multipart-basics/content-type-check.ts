export function isMultipartRequest(contentType: string | undefined): boolean {
  return contentType?.toLowerCase().startsWith("multipart/form-data;") === true &&
    contentType.toLowerCase().includes("boundary=");
}

console.log(isMultipartRequest("multipart/form-data; boundary=abc123"));
console.log(isMultipartRequest("application/json"));
