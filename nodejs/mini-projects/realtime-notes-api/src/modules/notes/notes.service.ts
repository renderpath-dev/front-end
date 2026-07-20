import { RealtimeEventType } from "../../generated/prisma/client.js";
import { requireOwner } from "../../shared/auth/authorize-owner.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { findNotebookById } from "../notebooks/notebooks.repository.js";
import { recordAndPublishNoteEvent } from "../../realtime/event-publisher.js";
import { createNote, deleteNote, findNoteById, listNotes, toNoteDto, updateNote } from "./notes.repository.js";
import type { NoteDto, NoteStatus } from "./notes.types.js";

export async function listNotebookNotes(ownerId: string, notebookId: string, query: { status?: NoteStatus; limit: number; offset: number }): Promise<NoteDto[]> {
  const notebook = await findNotebookById(notebookId);
  if (!notebook) throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  requireOwner(notebook.ownerId, ownerId);
  return (await listNotes({ ownerId, notebookId, ...query })).map(toNoteDto);
}

export async function createNotebookNote(ownerId: string, notebookId: string, input: { title: string; body: string; status: NoteStatus }): Promise<NoteDto> {
  const notebook = await findNotebookById(notebookId);
  if (!notebook) throw new HttpError(404, "Notebook was not found.", "NOTEBOOK_NOT_FOUND");
  requireOwner(notebook.ownerId, ownerId);

  const note = await createNote({ ownerId, notebookId, ...input });
  await recordAndPublishNoteEvent({
    ownerId,
    noteId: note.id,
    eventType: RealtimeEventType.NOTE_CREATED,
    payload: { noteId: note.id, notebookId: note.notebookId, title: note.title, updatedAt: note.updatedAt.toISOString() }
  });
  return toNoteDto(note);
}

export async function getNote(ownerId: string, noteId: string): Promise<NoteDto> {
  const note = await findNoteById(noteId);
  if (!note) throw new HttpError(404, "Note was not found.", "NOTE_NOT_FOUND");
  requireOwner(note.ownerId, ownerId);
  return toNoteDto(note);
}

export async function updateUserNote(ownerId: string, noteId: string, input: Partial<{ title: string; body: string; status: NoteStatus }>): Promise<NoteDto> {
  const existing = await findNoteById(noteId);
  if (!existing) throw new HttpError(404, "Note was not found.", "NOTE_NOT_FOUND");
  requireOwner(existing.ownerId, ownerId);

  const note = await updateNote(noteId, input);
  await recordAndPublishNoteEvent({
    ownerId,
    noteId: note.id,
    eventType: RealtimeEventType.NOTE_UPDATED,
    payload: { noteId: note.id, notebookId: note.notebookId, updatedAt: note.updatedAt.toISOString() }
  });
  return toNoteDto(note);
}

export async function deleteUserNote(ownerId: string, noteId: string): Promise<void> {
  const note = await findNoteById(noteId);
  if (!note) throw new HttpError(404, "Note was not found.", "NOTE_NOT_FOUND");
  requireOwner(note.ownerId, ownerId);
  await deleteNote(noteId);
  await recordAndPublishNoteEvent({
    ownerId,
    noteId,
    eventType: RealtimeEventType.NOTE_DELETED,
    payload: { noteId, notebookId: note.notebookId, deletedAt: new Date().toISOString() }
  });
}
