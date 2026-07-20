import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
const client = createClient({ url: redisUrl });

client.on("error", (error) => {
  console.error("Redis client error", error);
});

await client.connect();
await client.set("demo:connection", "ready", { EX: 10 });
const value = await client.get("demo:connection");
console.log({ value });
await client.quit();
