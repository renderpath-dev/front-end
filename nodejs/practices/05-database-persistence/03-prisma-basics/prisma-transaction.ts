import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

try {
  const [notebook, noteCount] = await prisma.$transaction([
    prisma.notebook.upsert({
      where: { name: "Transaction Basics" },
      update: {},
      create: { name: "Transaction Basics" }
    }),
    prisma.note.count()
  ]);

  console.log({ notebookId: notebook.id, noteCount });
} finally {
  await prisma.$disconnect();
}
