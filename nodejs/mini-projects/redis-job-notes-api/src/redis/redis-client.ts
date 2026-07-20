import { createClient, type RedisClientType } from "redis";
import { config } from "../config/env.js";
import { logger } from "../shared/logging/logger.js";

let redisClient: RedisClientType | undefined;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({ url: config.REDIS_URL });
    redisClient.on("error", (error) => {
      logger.error({ error }, "Redis client error");
    });
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}

export async function closeRedisClient(): Promise<void> {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }

  redisClient = undefined;
}
