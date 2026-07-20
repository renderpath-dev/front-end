import type { Response } from "express";
import { HttpError } from "../errors/http-error.js";

export type Role = "USER" | "ADMIN";

export type AuthContext = {
  userId: string;
  email: string;
  role: Role;
  sessionId: string;
};

export function attachAuthContext(response: Response, auth: AuthContext): void {
  response.locals.auth = auth;
}

export function requireAuthContext(response: Response): AuthContext {
  const auth = response.locals.auth as AuthContext | undefined;

  if (!auth) {
    throw new HttpError(401, "Authentication is required.", "AUTH_REQUIRED");
  }

  return auth;
}
