import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../03-prisma-basics/generated/prisma/client.js";

if (process.env.NODE_ENV !== "test") {
  throw new Error("Refusing to reset database outside NODE_ENV=test");
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

try {
  await prisma.$transaction([
    prisma.note.deleteMany(),
    prisma.notebook.deleteMany()
  ]);
} finally {
  await prisma.$disconnect();
}
