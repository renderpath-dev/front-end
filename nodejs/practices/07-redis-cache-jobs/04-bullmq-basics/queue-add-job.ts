import { Queue } from "bullmq";

const queue = new Queue("notes-export", {
  connection: { host: "127.0.0.1", port: 6379 },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 1000 }
  }
});

const job = await queue.add("export-notes", {
  exportId: "export_123",
  ownerId: "user_123",
  format: "JSON"
});

console.log({ jobId: job.id });
await queue.close();
