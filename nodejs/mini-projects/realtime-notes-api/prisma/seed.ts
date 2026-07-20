import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient, Role, NoteStatus } from "../src/generated/prisma/client.js";
import { hashPassword } from "../src/shared/auth/password-hashing.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  const owner = await prisma.user.upsert({
    where: { email: "owner@example.com" },
    update: {},
    create: {
      email: "owner@example.com",
      passwordHash: hashPassword("password-12345"),
      role: Role.USER
    }
  });

  const notebook = await prisma.notebook.upsert({
    where: { ownerId_name: { ownerId: owner.id, name: "Realtime notes" } },
    update: {},
    create: {
      ownerId: owner.id,
      name: "Realtime notes"
    }
  });

  await prisma.note.upsert({
    where: { notebookId_title: { notebookId: notebook.id, title: "First realtime note" } },
    update: {},
    create: {
      ownerId: owner.id,
      notebookId: notebook.id,
      title: "First realtime note",
      body: "Edit this note to emit realtime events.",
      status: NoteStatus.ACTIVE
    }
  });
}

await main();
await prisma.$disconnect();
