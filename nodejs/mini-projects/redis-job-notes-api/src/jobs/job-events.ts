import { QueueEvents } from "bullmq";
import { createBullMqConnectionOptions, NOTES_EXPORT_QUEUE_NAME } from "./queue.js";
import { logger } from "../shared/logging/logger.js";

export function createNotesExportQueueEvents(): QueueEvents {
  const events = new QueueEvents(NOTES_EXPORT_QUEUE_NAME, {
    connection: createBullMqConnectionOptions()
  });

  events.on("completed", ({ jobId }) => {
    logger.info({ jobId }, "Notes export job completed");
  });

  events.on("failed", ({ jobId, failedReason }) => {
    logger.error({ jobId, failedReason }, "Notes export job failed");
  });

  return events;
}
