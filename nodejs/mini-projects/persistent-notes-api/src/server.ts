import { app } from "./app.js";
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info("server started", {
    port: config.PORT,
    nodeEnv: config.NODE_ENV
  });
});

async function closeServer(signal: NodeJS.Signals): Promise<void> {
  logger.info("server shutdown requested", { signal });

  server.close(async (error) => {
    if (error) {
      logger.error("server shutdown failed", { signal }, error);
      process.exitCode = 1;
    }

    await disconnectPrisma();
    logger.info("server stopped", { signal });
  });
}

process.once("SIGINT", (signal) => {
  void closeServer(signal);
});

process.once("SIGTERM", (signal) => {
  void closeServer(signal);
});
