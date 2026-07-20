import type { AuthContext } from "../../shared/auth/auth-context.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { findNotebookById } from "../notebooks/notebooks.repository.js";
import { enqueueExportNotesJob } from "../../jobs/queue.js";
import { toBullMqJobId } from "../../redis/redis-keys.js";
import {
  createQueuedExportJob,
  findExportJobForOwner,
  markExportFailed,
  setExportJobId
} from "../../jobs/job-status.repository.js";
import type { CreateExportInput } from "./exports.types.js";

export async function createExport(auth: AuthContext, input: CreateExportInput) {
  if (input.notebookId) {
    const notebook = await findNotebookById(input.notebookId);
    if (!notebook || notebook.ownerId !== auth.userId) {
      throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
    }
  }

  const status = await createQueuedExportJob({
    ownerId: auth.userId,
    format: input.format,
    requestedNotebookId: input.notebookId
  });

  const jobId = toBullMqJobId(status.id);
  await setExportJobId(status.id, jobId);

  try {
    await enqueueExportNotesJob({
      exportId: status.id,
      ownerId: auth.userId,
      requestedNotebookId: input.notebookId,
      format: input.format
    });
  } catch (error) {
    await markExportFailed(status.id, error instanceof Error ? error.message : "Queue enqueue failed", 0);
    throw new HttpError(503, "Export queue is unavailable.", "EXPORT_QUEUE_UNAVAILABLE");
  }

  return {
    exportId: status.id,
    status: "QUEUED",
    statusUrl: `/exports/${status.id}`,
    jobId
  };
}

export async function getExport(auth: AuthContext, exportId: string) {
  const status = await findExportJobForOwner(exportId, auth.userId);
  if (!status) {
    throw new HttpError(404, "Export was not found.", "EXPORT_NOT_FOUND");
  }

  return status;
}
