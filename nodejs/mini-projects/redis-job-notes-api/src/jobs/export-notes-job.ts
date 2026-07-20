import type { Job } from "bullmq";
import { prisma } from "../db/prisma.js";
import { parseExportJobPayload, type ExportNotesJobPayload } from "./job-schema.js";
import {
  findExportJobById,
  markExportCompleted,
  markExportFailed,
  markExportProcessing
} from "./job-status.repository.js";

type ExportResult = {
  format: "JSON" | "CSV";
  count: number;
  content: unknown;
};

export async function processExportNotesJob(job: Job<ExportNotesJobPayload>): Promise<ExportResult> {
  const payload = parseExportJobPayload(job.data);
  const existing = await findExportJobById(payload.exportId);

  if (!existing) {
    throw new Error("Export status row was not found");
  }

  if (existing.status === "COMPLETED") {
    return existing.resultJson as ExportResult;
  }

  const attempts = job.attemptsMade + 1;
  await markExportProcessing(payload.exportId, attempts);

  try {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: payload.ownerId,
        notebookId: payload.requestedNotebookId
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        notebookId: true,
        title: true,
        body: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const rows = notes.map((note) => ({
      id: note.id,
      notebookId: note.notebookId,
      title: note.title,
      body: note.body,
      status: note.status,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString()
    }));

    const result: ExportResult = payload.format === "CSV"
      ? { format: "CSV", count: rows.length, content: toCsv(rows) }
      : { format: "JSON", count: rows.length, content: rows };

    await markExportCompleted(payload.exportId, result, attempts);
    return result;
  } catch (error) {
    await markExportFailed(payload.exportId, error instanceof Error ? error.message : "Export job failed", attempts);
    throw error;
  }
}

function toCsv(rows: Array<Record<string, string>>): string {
  const headers = ["id", "notebookId", "title", "body", "status", "createdAt", "updatedAt"];
  const body = rows.map((row) => headers.map((header) => escapeCsv(row[header] ?? "")).join(","));
  return [headers.join(","), ...body].join("\n");
}

function escapeCsv(value: string): string {
  if (!/[",\n]/.test(value)) {
    return value;
  }

  return `"${value.replaceAll('"', '""')}"`;
}
