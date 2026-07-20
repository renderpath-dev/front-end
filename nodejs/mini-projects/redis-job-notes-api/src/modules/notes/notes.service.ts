import type { AuthContext } from "../../shared/auth/auth-context.js";
import { assertOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { mapPrismaError } from "../../db/prisma-errors.js";
import { invalidateNotebookCaches } from "../../cache/cache-invalidation.js";
import { readNoteListCache, writeNoteListCache } from "../../cache/note-list-cache.js";
import { runSingleflight } from "../../cache/singleflight.js";
import { findNotebookById } from "../notebooks/notebooks.repository.js";
import * as repository from "./notes.repository.js";
import type { NoteStatus } from "./notes.types.js";

export async function list(auth: AuthContext, input: { notebookId: string; status?: NoteStatus; limit: number; offset: number }) {
  await assertNotebookOwner(auth, input.notebookId);
  const query = { status: input.status, limit: input.limit, offset: input.offset };
  const cached = await readNoteListCache(auth.userId, input.notebookId, query);
  if (cached.status === "HIT") {
    return { cacheStatus: "HIT" as const, notes: cached.value };
  }

  const notes = await runSingleflight(`notes:${auth.userId}:${input.notebookId}:${input.status ?? "ALL"}:${input.limit}:${input.offset}`, async () => {
    const records = await repository.listNotes({
      ownerId: auth.userId,
      notebookId: input.notebookId,
      status: input.status,
      limit: input.limit,
      offset: input.offset
    });
    const dtos = records.map(repository.toNoteDto);
    await writeNoteListCache(auth.userId, input.notebookId, query, dtos);
    return dtos;
  });

  return { cacheStatus: cached.status, notes };
}

export async function create(auth: AuthContext, notebookId: string, input: { title: string; body: string; status: NoteStatus }) {
  await assertNotebookOwner(auth, notebookId);

  try {
    const note = await repository.createNote({
      ownerId: auth.userId,
      notebookId,
      title: input.title,
      body: input.body,
      status: input.status
    });
    await invalidateNotebookCaches(auth.userId, notebookId);
    return repository.toNoteDto(note);
  } catch (error) {
    mapPrismaError(error, "NOTE_TITLE_CONFLICT");
  }
}

export async function getById(auth: AuthContext, noteId: string) {
  const note = await getOwnedNoteById(auth, noteId);
  return repository.toNoteDto(note);
}

export async function updateById(auth: AuthContext, noteId: string, input: Partial<{ title: string; body: string; status: NoteStatus }>) {
  const existing = await getOwnedNoteById(auth, noteId);

  try {
    const note = await repository.updateNote(noteId, input);
    await invalidateNotebookCaches(auth.userId, existing.notebookId);
    return repository.toNoteDto(note);
  } catch (error) {
    mapPrismaError(error, "NOTE_TITLE_CONFLICT");
  }
}

export async function removeById(auth: AuthContext, noteId: string): Promise<void> {
  const existing = await getOwnedNoteById(auth, noteId);
  await repository.deleteNote(noteId);
  await invalidateNotebookCaches(auth.userId, existing.notebookId);
}

async function assertNotebookOwner(auth: AuthContext, notebookId: string): Promise<void> {
  const notebook = await findNotebookById(notebookId);
  if (!notebook) {
    throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  }

  assertOwner(auth, notebook.ownerId);
}

async function getOwnedNoteById(auth: AuthContext, noteId: string) {
  const note = await repository.findNoteById(noteId);
  if (!note) {
    throw new HttpError(404, "Note was not found.", "NOTE_NOT_FOUND");
  }

  assertOwner(auth, note.ownerId);
  return note;
}
