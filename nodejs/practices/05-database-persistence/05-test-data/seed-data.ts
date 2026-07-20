import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../03-prisma-basics/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

try {
  const notebook = await prisma.notebook.upsert({
    where: { name: "Seed Notebook" },
    update: {},
    create: { name: "Seed Notebook" }
  });

  await prisma.note.upsert({
    where: {
      notebookId_title: {
        notebookId: notebook.id,
        title: "Seed Note"
      }
    },
    update: {},
    create: {
      notebookId: notebook.id,
      title: "Seed Note",
      body: "Seed data should be safe to run repeatedly."
    }
  });
} finally {
  await prisma.$disconnect();
}
