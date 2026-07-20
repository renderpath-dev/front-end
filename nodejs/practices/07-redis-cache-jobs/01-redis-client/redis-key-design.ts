import { createHash } from "node:crypto";

type NoteListQuery = {
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  limit: number;
  offset: number;
};

function hashQuery(query: NoteListQuery): string {
  const normalized = JSON.stringify({
    status: query.status ?? "ALL",
    limit: query.limit,
    offset: query.offset
  });
  return createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}

export function noteListCacheKey(userId: string, notebookId: string, query: NoteListQuery): string {
  return `cache:user:${userId}:notebook:${notebookId}:notes:${hashQuery(query)}:v1`;
}

console.log(noteListCacheKey("user_123", "notebook_456", { status: "ACTIVE", limit: 20, offset: 0 }));
