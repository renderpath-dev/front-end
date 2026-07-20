import { prisma } from "../../src/db/prisma.js";

export async function resetTestDatabase() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Refusing to reset database outside NODE_ENV=test");
  }

  await prisma.$transaction([
    prisma.exportJob.deleteMany(),
    prisma.note.deleteMany(),
    prisma.notebook.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany()
  ]);
}
