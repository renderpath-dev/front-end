import { config } from "../../config/env.js";
import { prisma } from "../../db/prisma.js";

export async function createSession(input: {
  userId: string;
  tokenHash: string;
  userAgent?: string;
  ipHash?: string;
}) {
  return prisma.session.create({
    data: {
      ...input,
      expiresAt: new Date(Date.now() + config.SESSION_TTL_SECONDS * 1000)
    }
  });
}

export async function revokeSession(sessionId: string): Promise<void> {
  await prisma.session.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() }
  });
}
