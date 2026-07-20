import { createHash, randomBytes } from "node:crypto";
import { config } from "../../config/env.js";

export function createSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("base64url");
}

export function createSessionExpiration(now = new Date()): Date {
  return new Date(now.getTime() + config.SESSION_TTL_SECONDS * 1000);
}
