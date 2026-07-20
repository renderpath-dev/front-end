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
  const selected = await prisma.notebook.findMany({
    select: {
      id: true,
      name: true
    }
  });

  const included = await prisma.notebook.findMany({
    include: {
      notes: {
        select: {
          id: true,
          title: true,
          status: true
        }
      }
    }
  });

  console.log({ selected, included });
} finally {
  await prisma.$disconnect();
}
