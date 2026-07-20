import type { IncomingMessage } from "node:http";
import { config } from "../config/env.js";
import { prisma } from "../db/prisma.js";
import type { AuthContext } from "../shared/auth/auth-context.js";
import { parseCookieHeader } from "../shared/cookies/cookie-parser.js";
import { hashSessionToken } from "../shared/auth/session-token.js";

export async function authenticateWebSocketRequest(request: IncomingMessage): Promise<AuthContext | null> {
  const cookies = parseCookieHeader(request.headers.cookie);
  const token = cookies.get(config.SESSION_COOKIE_NAME);
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: { user: true }
  });

  if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
    return null;
  }

  return {
    userId: session.userId,
    email: session.user.email,
    role: session.user.role,
    sessionId: session.id
  };
}
