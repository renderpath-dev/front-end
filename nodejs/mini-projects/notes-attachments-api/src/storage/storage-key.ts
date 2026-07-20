import { randomUUID } from "node:crypto";

export function createStorageKey(input: {
  ownerId: string;
  noteId: string;
  extension: string;
}): string {
  return `owners/${input.ownerId}/notes/${input.noteId}/attachments/${randomUUID()}${input.extension}`;
}

export function storedNameFromStorageKey(storageKey: string): string {
  const segments = storageKey.split("/");
  return segments.at(-1) ?? storageKey;
}
