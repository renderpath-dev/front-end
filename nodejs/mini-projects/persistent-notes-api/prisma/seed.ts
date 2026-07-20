import { prisma } from "../src/db/prisma.js";

async function seed(): Promise<void> {
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
    update: {
      body: "Seed data can be re-applied without duplicates."
    },
    create: {
      notebookId: notebook.id,
      title: "Seed Note",
      body: "Seed data can be re-applied without duplicates."
    }
  });
}

try {
  await seed();
} finally {
  await prisma.$disconnect();
}
