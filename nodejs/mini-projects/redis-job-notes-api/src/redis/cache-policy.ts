import { config } from "../config/env.js";

export type CacheStatus = "HIT" | "MISS" | "BYPASS";

export function cacheTtlSeconds(): number {
  return config.CACHE_TTL_SECONDS;
}

export function cacheBypassReason(error: unknown): string {
  return error instanceof Error ? error.message : "redis cache unavailable";
}
