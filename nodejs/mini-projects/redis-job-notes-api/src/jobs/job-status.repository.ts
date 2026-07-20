import { prisma } from "../db/prisma.js";

export type ExportFormat = "JSON" | "CSV";

export type ExportJobDto = {
  id: string;
  status: string;
  format: ExportFormat;
  requestedNotebookId: string | null;
  jobId: string | null;
  result: unknown;
  errorMessage: string | null;
  attempts: number;
  statusUrl: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

function toDto(row: {
  id: string;
  status: string;
  format: ExportFormat;
  requestedNotebookId: string | null;
  jobId: string | null;
  resultJson: unknown;
  errorMessage: string | null;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}): ExportJobDto {
  return {
    id: row.id,
    status: row.status,
    format: row.format,
    requestedNotebookId: row.requestedNotebookId,
    jobId: row.jobId,
    result: row.resultJson,
    errorMessage: row.errorMessage,
    attempts: row.attempts,
    statusUrl: `/exports/${row.id}`,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    completedAt: row.completedAt?.toISOString() ?? null
  };
}

export async function createQueuedExportJob(input: {
  ownerId: string;
  format: ExportFormat;
  requestedNotebookId?: string;
}): Promise<ExportJobDto> {
  const row = await prisma.exportJob.create({
    data: {
      ownerId: input.ownerId,
      format: input.format,
      requestedNotebookId: input.requestedNotebookId
    }
  });

  return toDto(row);
}

export async function setExportJobId(exportId: string, jobId: string): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: { jobId }
  });
}

export async function findExportJobForOwner(exportId: string, ownerId: string): Promise<ExportJobDto | null> {
  const row = await prisma.exportJob.findFirst({
    where: { id: exportId, ownerId }
  });

  return row ? toDto(row) : null;
}

export async function markExportProcessing(exportId: string, attempts: number): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: {
      status: "PROCESSING",
      attempts,
      errorMessage: null
    }
  });
}

export async function markExportCompleted(exportId: string, result: unknown, attempts: number): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: {
      status: "COMPLETED",
      resultJson: result as object,
      attempts,
      completedAt: new Date()
    }
  });
}

export async function markExportFailed(exportId: string, errorMessage: string, attempts: number): Promise<void> {
  await prisma.exportJob.update({
    where: { id: exportId },
    data: {
      status: "FAILED",
      errorMessage,
      attempts
    }
  });
}

export async function findExportJobById(exportId: string) {
  return prisma.exportJob.findUnique({ where: { id: exportId } });
}
