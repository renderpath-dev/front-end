import { deleteNotebookListCache } from "./notebook-cache.js";
import { deleteNoteListCaches } from "./note-list-cache.js";

export async function invalidateNotebookCaches(userId: string, notebookId?: string): Promise<void> {
  await deleteNotebookListCache(userId);

  if (notebookId) {
    await deleteNoteListCaches(userId, notebookId);
  }
}

export async function clearUserCache(userId: string): Promise<void> {
  await deleteNotebookListCache(userId);
}
