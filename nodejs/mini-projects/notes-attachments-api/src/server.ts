import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { app } from "./app.js";
import { logger } from "./shared/logging/logger.js";

const server = app.listen(config.PORT, () => {
  logger.info("HTTP server started.", { port: config.PORT });
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(async () => {
      await disconnectPrisma();
      process.exit(0);
    });
  });
}
