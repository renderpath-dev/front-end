import type { RequestHandler } from "express";
import { HttpError } from "../../shared/errors/http-error.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { getValidated } from "../../shared/validation/validate-request.js";
import { notesService } from "./notes.service.js";
import type {
  CreateNoteInput,
  DomainError,
  Note,
  NoteIdParams,
  NoteResponseDto,
  UpdateNoteInput
} from "./notes.types.js";

function toNoteResponseDto(note: Note): NoteResponseDto {
  return {
    id: note.id,
    title: note.title,
    body: note.body,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString()
  };
}

function mapDomainErrorToHttpError(error: DomainError): HttpError {
  if (error.code === "NOTE_NOT_FOUND") {
    return new HttpError(404, error.code, "Note was not found");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Unexpected service error");
}

export const listNotes: RequestHandler = async (_request, response) => {
  const result = await notesService.listNotes();

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data.map(toNoteResponseDto));
};

export const createNote: RequestHandler = async (_request, response) => {
  const input = getValidated<CreateNoteInput>(response, "body");
  const result = await notesService.createNote(input);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 201, toNoteResponseDto(result.data));
};

export const getNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.getNote(params.id);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const updateNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const input = getValidated<UpdateNoteInput>(response, "body");
  const result = await notesService.updateNote(params.id, input);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, toNoteResponseDto(result.data));
};

export const deleteNote: RequestHandler = async (_request, response) => {
  const params = getValidated<NoteIdParams>(response, "params");
  const result = await notesService.deleteNote(params.id);

  if (!result.ok) {
    throw mapDomainErrorToHttpError(result.error);
  }

  sendResponse(response, 200, result.data);
};
