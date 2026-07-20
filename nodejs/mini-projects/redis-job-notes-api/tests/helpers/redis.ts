import { closeRedisClient, getRedisClient } from "../../src/redis/redis-client.js";

export async function resetTestRedis(): Promise<void> {
  const redis = await getRedisClient();
  await redis.sendCommand(["FLUSHDB"]);
}

export async function closeTestRedis(): Promise<void> {
  await closeRedisClient();
}
