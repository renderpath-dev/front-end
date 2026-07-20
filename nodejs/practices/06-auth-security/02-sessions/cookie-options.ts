import type { CookieOptions } from "express";

export function createSessionCookieOptions(isProduction: boolean): CookieOptions {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 8
  };
}

console.log(createSessionCookieOptions(false));
