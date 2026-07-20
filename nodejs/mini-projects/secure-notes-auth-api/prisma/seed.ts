import { prisma } from "../src/db/prisma.js";
import { hashPassword } from "../src/shared/auth/password-hashing.js";

async function main() {
  const adminPasswordHash = await hashPassword("admin-passphrase-2026");
  const userPasswordHash = await hashPassword("user-passphrase-2026");

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { passwordHash: adminPasswordHash, role: "ADMIN" },
    create: {
      email: "admin@example.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN"
    }
  });

  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: { passwordHash: userPasswordHash, role: "USER" },
    create: {
      email: "user@example.com",
      passwordHash: userPasswordHash,
      role: "USER"
    }
  });
}

await main();
await prisma.$disconnect();
