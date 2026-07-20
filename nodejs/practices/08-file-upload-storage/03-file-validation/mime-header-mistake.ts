const clientHeaders = [
  { filename: "invoice.pdf", contentType: "application/pdf" },
  { filename: "shell.php", contentType: "image/png" }
];

for (const header of clientHeaders) {
  console.log({
    filename: header.filename,
    contentType: header.contentType,
    trustedForStorage: false
  });
}

export {};
