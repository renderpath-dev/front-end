import { randomBytes } from "node:crypto";

export function createSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

const token = createSessionToken();
console.log(token.length);
console.log(token);
