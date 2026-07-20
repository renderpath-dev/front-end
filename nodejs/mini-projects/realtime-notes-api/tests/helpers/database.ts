import { prisma } from "../../src/db/prisma.js";

export function integrationTestsEnabled(): boolean {
  return process.env.RUN_REALTIME_TESTS === "true" && Boolean(process.env.DATABASE_URL) && Boolean(process.env.REDIS_URL);
}

export async function resetDatabase(): Promise<void> {
  await prisma.realtimeEvent.deleteMany();
  await prisma.note.deleteMany();
  await prisma.notebook.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
}
