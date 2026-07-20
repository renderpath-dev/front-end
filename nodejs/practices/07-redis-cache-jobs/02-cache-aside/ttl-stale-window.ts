type CacheEntry = {
  payload: string;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry>();

function setWithTtl(key: string, payload: string, ttlMs: number): void {
  cache.set(key, { payload, expiresAt: Date.now() + ttlMs });
}

function getWithStaleWindow(key: string): "FRESH" | "STALE" | "MISS" {
  const entry = cache.get(key);
  if (!entry) return "MISS";
  return entry.expiresAt > Date.now() ? "FRESH" : "STALE";
}

setWithTtl("cache:user:user_123:notebooks:v1", "[]", 1000);
console.log(getWithStaleWindow("cache:user:user_123:notebooks:v1"));
