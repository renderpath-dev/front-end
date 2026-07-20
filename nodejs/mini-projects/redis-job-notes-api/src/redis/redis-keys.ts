import { createHash } from "node:crypto";

type NoteListQuery = {
  status?: string;
  limit: number;
  offset: number;
};

function assertSafeKeyPart(value: string, label: string): string {
  if (!/^[A-Za-z0-9_.-]+$/.test(value)) {
    throw new Error(`${label} contains unsafe Redis key characters`);
  }

  return value;
}

export function hashQuery(input: NoteListQuery): string {
  const normalized = JSON.stringify({
    status: input.status ?? "ALL",
    limit: input.limit,
    offset: input.offset
  });

  return createHash("sha256").update(normalized, "utf8").digest("hex").slice(0, 16);
}

export function userNotebooksKey(userId: string): string {
  return `cache:user:${assertSafeKeyPart(userId, "userId")}:notebooks:v1`;
}

export function userNotebookNotesKey(userId: string, notebookId: string, query: NoteListQuery): string {
  return [
    "cache",
    "user",
    assertSafeKeyPart(userId, "userId"),
    "notebook",
    assertSafeKeyPart(notebookId, "notebookId"),
    "notes",
    hashQuery(query),
    "v1"
  ].join(":");
}

export function userNotebookNotesPattern(userId: string, notebookId: string): string {
  return `cache:user:${assertSafeKeyPart(userId, "userId")}:notebook:${assertSafeKeyPart(notebookId, "notebookId")}:notes:*:v1`;
}

export function exportsRateLimitKey(identity: string, windowStartSeconds: number): string {
  return `rate:user:${assertSafeKeyPart(identity, "identity")}:exports:${windowStartSeconds}`;
}

export function exportJobLockKey(jobId: string): string {
  return `job:lock:${assertSafeKeyPart(jobId, "jobId")}`;
}

export function toBullMqJobId(exportId: string): string {
  const jobId = `export-${exportId.replaceAll("-", "")}`;
  if (jobId.includes(":")) {
    throw new Error("BullMQ custom job ids must not contain a colon");
  }

  return jobId;
}
