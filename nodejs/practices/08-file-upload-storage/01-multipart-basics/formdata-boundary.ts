const form = new FormData();
form.append("title", "avatar");
form.append("file", new Blob([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], { type: "image/png" }), "avatar.png");

const request = new Request("http://example.test/upload", {
  method: "POST",
  body: form
});

console.log({
  contentType: request.headers.get("content-type"),
  hasBoundary: request.headers.get("content-type")?.includes("boundary=") ?? false
});
