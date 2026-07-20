import { prisma } from "../../db/prisma.js";
import type { PublicUser, UserRecord } from "./users.types.js";

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString()
  };
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(input: { email: string; passwordHash: string }): Promise<UserRecord> {
  return prisma.user.create({ data: input });
}
