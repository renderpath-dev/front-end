import { prisma } from "../../db/prisma.js";
import { createSessionExpiration } from "../../shared/auth/session-token.js";

export async function createSession(input: {
  userId: string;
  tokenHash: string;
  userAgent?: string;
  ipHash?: string;
}) {
  return prisma.session.create({
    data: {
      userId: input.userId,
      tokenHash: input.tokenHash,
      userAgent: input.userAgent,
      ipHash: input.ipHash,
      expiresAt: createSessionExpiration()
    }
  });
}

export async function revokeSession(sessionId: string): Promise<void> {
  await prisma.session.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() }
  });
}
