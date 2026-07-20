import { prisma } from "../../db/prisma.js";
import type { PublicUser, Role, UserRecord } from "./users.types.js";

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString()
  };
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  return user ? toUserRecord(user) : null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? toUserRecord(user) : null;
}

export async function createUser(input: { email: string; passwordHash: string; role?: Role }): Promise<UserRecord> {
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash: input.passwordHash,
      role: input.role ?? "USER"
    }
  });

  return toUserRecord(user);
}

function toUserRecord(user: { id: string; email: string; passwordHash: string; role: Role; createdAt: Date }): UserRecord {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role,
    createdAt: user.createdAt
  };
}
