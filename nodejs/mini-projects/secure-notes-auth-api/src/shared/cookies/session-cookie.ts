import type { Response } from "express";
import { config } from "../../config/env.js";

export function setSessionCookie(response: Response, token: string): void {
  response.cookie(config.SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: "lax",
    path: "/",
    maxAge: config.SESSION_TTL_SECONDS * 1000
  });
}

export function clearSessionCookie(response: Response): void {
  response.clearCookie(config.SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: "lax",
    path: "/"
  });
}
