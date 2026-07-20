import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

try {
  const notebook = await prisma.notebook.upsert({
    where: { name: "Prisma Basics" },
    update: {},
    create: { name: "Prisma Basics" }
  });

  console.log(notebook);
} finally {
  await prisma.$disconnect();
}
