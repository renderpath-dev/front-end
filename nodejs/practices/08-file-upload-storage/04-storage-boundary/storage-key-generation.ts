import { randomUUID } from "node:crypto";

export function createStorageKey(ownerId: string, noteId: string, extension: string): string {
  return `owners/${ownerId}/notes/${noteId}/attachments/${randomUUID()}${extension}`;
}

console.log(createStorageKey("owner-1", "note-1", ".png"));
