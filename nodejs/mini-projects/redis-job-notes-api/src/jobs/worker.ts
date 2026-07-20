import { Worker } from "bullmq";
import { processExportNotesJob } from "./export-notes-job.js";
import { createBullMqConnectionOptions, NOTES_EXPORT_QUEUE_NAME } from "./queue.js";
import type { ExportNotesJobPayload } from "./job-schema.js";

export function createNotesExportWorker(): Worker<ExportNotesJobPayload> {
  return new Worker<ExportNotesJobPayload>(
    NOTES_EXPORT_QUEUE_NAME,
    async (job) => processExportNotesJob(job),
    {
      connection: createBullMqConnectionOptions(),
      concurrency: 1
    }
  );
}
