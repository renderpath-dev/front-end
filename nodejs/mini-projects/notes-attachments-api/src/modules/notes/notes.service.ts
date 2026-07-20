import type { AuthContext } from "../../shared/auth/auth-context.js";
import { authorizeOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import * as notebooksService from "../notebooks/notebooks.service.js";
import * as repository from "./notes.repository.js";
import type { NoteDto, NoteStatus } from "./notes.types.js";

export async function list(auth: AuthContext, input: {
  notebookId: string;
  status?: NoteStatus;
  limit: number;
  offset: number;
}): Promise<NoteDto[]> {
  await notebooksService.requireOwnedNotebook(auth, input.notebookId);
  const notes = await repository.listNotes({
    ownerId: auth.userId,
    notebookId: input.notebookId,
    status: input.status,
    limit: input.limit,
    offset: input.offset
  });
  return notes.map(repository.toNoteDto);
}

export async function create(auth: AuthContext, notebookId: string, input: {
  title: string;
  body: string;
  status: NoteStatus;
}): Promise<NoteDto> {
  await notebooksService.requireOwnedNotebook(auth, notebookId);
  const note = await repository.createNote({
    ownerId: auth.userId,
    notebookId,
    title: input.title,
    body: input.body,
    status: input.status
  });
  return repository.toNoteDto(note);
}

export async function getById(auth: AuthContext, noteId: string): Promise<NoteDto> {
  return repository.toNoteDto(await requireOwnedNote(auth, noteId));
}

export async function updateById(auth: AuthContext, noteId: string, input: Partial<{
  title: string;
  body: string;
  status: NoteStatus;
}>): Promise<NoteDto> {
  await requireOwnedNote(auth, noteId);
  return repository.toNoteDto(await repository.updateNote(noteId, input));
}

export async function removeById(auth: AuthContext, noteId: string): Promise<void> {
  await requireOwnedNote(auth, noteId);
  await repository.deleteNote(noteId);
}

export async function requireOwnedNote(auth: AuthContext, noteId: string) {
  const note = await repository.findNoteById(noteId);
  if (!note) {
    throw new HttpError(404, "Note was not found.", "NOTE_NOT_FOUND");
  }
  authorizeOwner(auth, note.ownerId);
  return note;
}
