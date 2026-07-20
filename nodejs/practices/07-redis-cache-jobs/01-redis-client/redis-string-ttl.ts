import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });
await client.connect();

const key = "cache:user:user_123:notebooks:v1";
await client.set(key, JSON.stringify([{ id: "notebook_1", name: "Work" }]), { EX: 30 });
console.log({ ttlAfterSet: await client.ttl(key) });

await client.expire(key, 5);
console.log({ ttlAfterExpire: await client.ttl(key) });

await client.quit();
