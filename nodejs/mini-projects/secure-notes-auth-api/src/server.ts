import { app } from "./app.js";
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info({ port: config.PORT }, "Secure notes auth API started");
});

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "Shutting down secure notes auth API");
  server.close(async () => {
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
