import type { Response } from "express";

export type AuthContext = {
  userId: string;
  role: "USER" | "ADMIN";
  sessionId: string;
};

export function attachAuthContext(response: Response, context: AuthContext): void {
  response.locals.auth = context;
}

export function requireAuthContext(response: Response): AuthContext {
  const auth = response.locals.auth as AuthContext | undefined;

  if (!auth) {
    throw new Error("Authentication middleware did not attach an auth context.");
  }

  return auth;
}
