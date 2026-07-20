const allowedOrigins = new Set(["http://localhost:3000"]);

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  return allowedOrigins.has(origin);
}

console.log(isAllowedOrigin("http://localhost:3000"));
console.log(isAllowedOrigin("https://example.invalid"));
