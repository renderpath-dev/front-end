import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });
await client.connect();

const pipeline = client.multi();
pipeline.set("demo:pipeline:a", "1");
pipeline.set("demo:pipeline:b", "2");
await pipeline.execAsPipeline();

const transaction = client.multi();
transaction.incr("demo:transaction:counter");
transaction.expire("demo:transaction:counter", 60);
const result = await transaction.exec();

console.log({ result });
await client.quit();
