import { z } from "zod";
import { getRedisClient } from "../redis/redis-client.js";
import { parseCacheValue, serializeCacheValue, type CacheReadResult } from "../redis/cache-json.js";
import { cacheBypassReason, cacheTtlSeconds } from "../redis/cache-policy.js";
import { userNotebooksKey } from "../redis/redis-keys.js";
import type { NotebookDto } from "../modules/notebooks/notebooks.types.js";

const notebookDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const notebookListSchema = z.array(notebookDtoSchema);

export async function readNotebookListCache(userId: string): Promise<CacheReadResult<NotebookDto[]>> {
  const key = userNotebooksKey(userId);
  try {
    const redis = await getRedisClient();
    return parseCacheValue(await redis.get(key), notebookListSchema);
  } catch (error) {
    return { status: "BYPASS", reason: cacheBypassReason(error) };
  }
}

export async function writeNotebookListCache(userId: string, notebooks: NotebookDto[]): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.set(userNotebooksKey(userId), serializeCacheValue(notebooks), { EX: cacheTtlSeconds() });
  } catch {
  }
}

export async function deleteNotebookListCache(userId: string): Promise<void> {
  try {
    const redis = await getRedisClient();
    await redis.del(userNotebooksKey(userId));
  } catch {
  }
}

export async function inspectNotebookListCache(userId: string): Promise<{ key: string; exists: boolean; ttl: number }> {
  const key = userNotebooksKey(userId);
  const redis = await getRedisClient();
  const ttl = await redis.ttl(key);
  return { key, exists: ttl !== -2, ttl };
}
