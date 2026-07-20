import type { Response } from "express";
import { config } from "../../config/env.js";

export function setSessionCookie(response: Response, token: string): void {
  const attributes = [
    `${config.SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${config.SESSION_TTL_SECONDS}`
  ];

  if (config.COOKIE_SECURE) {
    attributes.push("Secure");
  }

  response.setHeader("Set-Cookie", attributes.join("; "));
}

export function clearSessionCookie(response: Response): void {
  response.setHeader("Set-Cookie", `${config.SESSION_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
}
