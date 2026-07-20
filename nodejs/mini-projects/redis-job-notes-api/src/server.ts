import { app } from "./app.js";
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { closeRedisClient } from "./redis/redis-client.js";
import { closeExportQueue } from "./jobs/queue.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info({ port: config.PORT }, "Redis job notes API started");
});

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "Shutting down Redis job notes API");
  server.close(async () => {
    await closeExportQueue();
    await closeRedisClient();
    await disconnectPrisma();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
