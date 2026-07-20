import { config } from "../config/env.js";
import { getRedisClient } from "../redis/redis-client.js";
import { exportsRateLimitKey } from "../redis/redis-keys.js";

export type FixedWindowDecision = {
  allowed: boolean;
  key: string;
  count: number;
  limit: number;
  ttl: number;
  resetSeconds: number;
};

export function currentWindowStartSeconds(now = Date.now(), windowSeconds = config.EXPORT_RATE_LIMIT_WINDOW_SECONDS): number {
  return Math.floor(now / (windowSeconds * 1000)) * windowSeconds;
}

export async function consumeExportRateLimit(identity: string): Promise<FixedWindowDecision> {
  const windowStart = currentWindowStartSeconds();
  const key = exportsRateLimitKey(identity, windowStart);
  const redis = await getRedisClient();
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, config.EXPORT_RATE_LIMIT_WINDOW_SECONDS);
  }

  const ttl = await redis.ttl(key);
  return {
    allowed: count <= config.EXPORT_RATE_LIMIT_MAX,
    key,
    count,
    limit: config.EXPORT_RATE_LIMIT_MAX,
    ttl,
    resetSeconds: ttl > 0 ? ttl : config.EXPORT_RATE_LIMIT_WINDOW_SECONDS
  };
}
