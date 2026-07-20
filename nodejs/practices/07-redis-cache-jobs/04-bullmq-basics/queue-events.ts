import { QueueEvents } from "bullmq";

const events = new QueueEvents("notes-export", {
  connection: { host: "127.0.0.1", port: 6379 }
});

events.on("completed", ({ jobId }) => {
  console.log({ event: "completed", jobId });
});

events.on("failed", ({ jobId, failedReason }) => {
  console.log({ event: "failed", jobId, failedReason });
});
