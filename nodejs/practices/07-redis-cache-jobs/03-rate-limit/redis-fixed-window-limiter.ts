import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });
await client.connect();

const key = "rate:user:user_123:exports:2026-07-19T00:00";
const count = await client.incr(key);
if (count === 1) {
  await client.expire(key, 60);
}

const allowed = count <= 5;
const ttl = await client.ttl(key);
console.log({ allowed, count, ttl });
await client.quit();
