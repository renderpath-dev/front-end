import type { RequestHandler } from "express";
import { HttpError } from "../../shared/errors/http-error.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { getValidated } from "../../shared/validation/validate-request.js";
import type { NotebookIdParams } from "../notebooks/notebooks.types.js";
import { notesService } from "./notes.service.js";
import type {
  CreateNoteInput,
  ListNotesQuery,
  Note,
  NoteDomainError,
  NoteIdParams,
  NoteResponseDto,
  UpdateNoteInput
} from "./notes.types.js";

function toNoteResponseDto(note: Note): NoteResponseDto {
  return {
    id: note.id,
    notebookId: note.notebookId,
    title: note.title,
    body: note.body,
    status: note.status,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString()
  };
}

function mapNoteErrorToHttpError(error: NoteDomainError): HttpError {
  if (error.code === "NOTEBOOK_NOT_FOUND" || error.code === "NOTE_NOT_FOUND") {
    return new HttpError(404, error.code, "Requested resource was not found");
  }

  if (error.code === "NOTE_TITLE_CONFLICT") {
    return new HttpError(409, error.code, "Note title already exists in this notebook");
  }

  if (error.code === "INVALID_REFERENCE") {
    return new HttpError(400, error.code, "Referenced resource was invalid");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Unexpected database failure");
}

export const listNotebookNotes: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const query = getValidated<ListNotesQuery>(response, "query");
  const result = await notesService.listNotebookNotes(params.notebookId, query);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data.map(toNoteResponseDto));
};

export const createNotebookNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NotebookIdParams>(response, "params");
  const input = getValidated<CreateNoteInput>(response, "body");
  const result = await notesService.createNotebookNote(params.notebookId, input);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 201, toNoteResponseDto(result.data));
};

export const getNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.getNote(params.noteId);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const updateNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const input = getValidated<UpdateNoteInput>(response, "body");
  const result = await notesService.updateNote(params.noteId, input);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const deleteNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.deleteNote(params.noteId);

  if (!result.ok) {
    throw mapNoteErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data);
};
