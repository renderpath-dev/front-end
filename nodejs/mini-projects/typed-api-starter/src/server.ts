import { app } from "./app.js";
import { config } from "./config/env.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info("server started", {
    port: config.PORT,
    nodeEnv: config.NODE_ENV
  });
});

function closeServer(signal: NodeJS.Signals): void {
  logger.info("server shutdown requested", { signal });

  server.close((error) => {
    if (error) {
      logger.error("server shutdown failed", { signal }, error);
      process.exitCode = 1;
      return;
    }

    logger.info("server stopped", { signal });
  });
}

process.once("SIGINT", closeServer);
process.once("SIGTERM", closeServer);
