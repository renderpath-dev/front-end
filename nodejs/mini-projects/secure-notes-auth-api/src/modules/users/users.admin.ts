import { prisma } from "../../db/prisma.js";
import type { PublicUser } from "./users.types.js";
import { toPublicUser } from "./users.repository.js";

export async function listPublicUsersForAdmin(): Promise<PublicUser[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return users.map(toPublicUser);
}
