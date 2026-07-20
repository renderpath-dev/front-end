import { Worker } from "bullmq";

const worker = new Worker(
  "notes-export",
  async (job) => {
    console.log({ jobId: job.id, payload: job.data });
  },
  { connection: { host: "127.0.0.1", port: 6379 } }
);

process.on("SIGTERM", () => {
  void worker.close();
});
