import type { NextFunction, Request, Response } from "express";

type SessionStore = {
  findActiveUserByTokenHash(tokenHash: string): Promise<{ id: string; role: "USER" | "ADMIN" } | null>;
};

export function createAuthenticateSession(store: SessionStore) {
  return async function authenticateSession(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies?.session;

    if (typeof token !== "string") {
      response.status(401).json({ ok: false, error: { code: "AUTH_REQUIRED" } });
      return;
    }

    const user = await store.findActiveUserByTokenHash(token);

    if (!user) {
      response.status(401).json({ ok: false, error: { code: "AUTH_REQUIRED" } });
      return;
    }

    response.locals.auth = { userId: user.id, role: user.role };
    next();
  };
}
