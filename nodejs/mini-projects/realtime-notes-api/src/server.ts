import { createServer } from "node:http";
import { config } from "./config/env.js";
import { disconnectPrisma } from "./db/prisma.js";
import { closeRedisClient } from "./redis/redis-client.js";
import { subscribeToRealtimeFanout } from "./redis/redis-pubsub.js";
import { app } from "./app.js";
import { deliverRealtimeEvent } from "./realtime/event-publisher.js";
import { sseRegistry } from "./sse/sse-registry.js";
import { logger } from "./shared/logging/logger.js";
import { createRealtimeWebSocketServer } from "./websocket/websocket-server.js";
import { installWebSocketUpgrade } from "./websocket/websocket-upgrade.js";

const httpServer = createServer(app);
const realtimeWebSocketServer = createRealtimeWebSocketServer();
const upgradeController = installWebSocketUpgrade(httpServer, realtimeWebSocketServer);
let unsubscribeRedisFanout: (() => Promise<void>) | undefined;
let isShuttingDown = false;

async function start(): Promise<void> {
  unsubscribeRedisFanout = await subscribeToRealtimeFanout(deliverRealtimeEvent);

  httpServer.listen(config.PORT, () => {
    logger.info("HTTP server started.", { port: config.PORT });
  });
}

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;
  logger.info("Shutdown signal received.", { signal });
  upgradeController.stopAccepting();

  await new Promise<void>((resolve) => {
    httpServer.close(() => resolve());
  });

  sseRegistry.closeAll();
  realtimeWebSocketServer.closeAll("Server shutdown");

  if (unsubscribeRedisFanout) {
    await unsubscribeRedisFanout();
  }

  await closeRedisClient();
  await disconnectPrisma();
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    void shutdown(signal).then(() => process.exit(0));
  });
}

await start();
