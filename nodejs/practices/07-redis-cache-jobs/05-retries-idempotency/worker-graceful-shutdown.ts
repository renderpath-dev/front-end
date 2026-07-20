import type { Worker } from "bullmq";
import type { RedisClientType } from "redis";

export async function shutdownWorker(worker: Worker, redis: RedisClientType): Promise<void> {
  await worker.close();
  await redis.quit();
}
