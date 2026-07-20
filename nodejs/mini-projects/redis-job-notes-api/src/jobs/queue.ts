import { Queue } from "bullmq";
import { config } from "../config/env.js";
import { toBullMqJobId } from "../redis/redis-keys.js";
import type { ExportNotesJobPayload } from "./job-schema.js";

export const NOTES_EXPORT_QUEUE_NAME = "notes-export";

export function createBullMqConnectionOptions() {
  const url = new URL(config.REDIS_URL);
  const db = Number.parseInt(url.pathname.replace("/", ""), 10);

  return {
    host: url.hostname || "127.0.0.1",
    port: Number.parseInt(url.port || "6379", 10),
    username: url.username || undefined,
    password: url.password || undefined,
    db: Number.isInteger(db) ? db : 0,
    maxRetriesPerRequest: null
  };
}

export const notesExportQueue = new Queue<ExportNotesJobPayload>(NOTES_EXPORT_QUEUE_NAME, {
  connection: createBullMqConnectionOptions(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000
    },
    removeOnComplete: false,
    removeOnFail: false
  }
});

export async function enqueueExportNotesJob(payload: ExportNotesJobPayload) {
  return notesExportQueue.add("export-notes", payload, {
    jobId: toBullMqJobId(payload.exportId)
  });
}

export async function closeExportQueue(): Promise<void> {
  await notesExportQueue.close();
}
