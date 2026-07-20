import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export function createCsrfToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashCsrfToken(token: string): string {
  return createHash("sha256").update("csrf:" + token, "utf8").digest("base64url");
}

export function verifyCsrfToken(candidateToken: string, storedHash: string): boolean {
  const candidateHash = Buffer.from(hashCsrfToken(candidateToken), "base64url");
  const expectedHash = Buffer.from(storedHash, "base64url");
  return candidateHash.length === expectedHash.length && timingSafeEqual(candidateHash, expectedHash);
}
