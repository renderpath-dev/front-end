import { disconnectPrisma } from "./db/prisma.js";
import { closeRedisClient } from "./redis/redis-client.js";
import { createNotesExportQueueEvents } from "./jobs/job-events.js";
import { createNotesExportWorker } from "./jobs/worker.js";
import { logger } from "./shared/logging/logger.js";

const worker = createNotesExportWorker();
const queueEvents = createNotesExportQueueEvents();

logger.info({}, "Notes export worker started");

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "Shutting down notes export worker");
  await worker.close();
  await queueEvents.close();
  await closeRedisClient();
  await disconnectPrisma();
  process.exit(0);
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
