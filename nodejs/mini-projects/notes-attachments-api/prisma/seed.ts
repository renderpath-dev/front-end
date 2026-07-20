import "dotenv/config";
import { prisma, disconnectPrisma } from "../src/db/prisma.js";
import { hashPassword } from "../src/shared/auth/password-hashing.js";

async function main(): Promise<void> {
  await prisma.attachment.deleteMany();
  await prisma.note.deleteMany();
  await prisma.notebook.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "learner@example.com",
      passwordHash: await hashPassword("Password12345!")
    }
  });

  const notebook = await prisma.notebook.create({
    data: {
      ownerId: user.id,
      name: "Upload Notes"
    }
  });

  await prisma.note.create({
    data: {
      ownerId: user.id,
      notebookId: notebook.id,
      title: "Attachment boundaries",
      body: "Store metadata in PostgreSQL and bytes outside the public route tree."
    }
  });
}

await main()
  .finally(async () => {
    await disconnectPrisma();
  });
