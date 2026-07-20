import { Router } from "express";
import {
  createNoteSchema,
  noteIdParamsSchema,
  updateNoteSchema,
  type CreateNoteInput,
  type NoteIdParams,
  type UpdateNoteInput
} from "./notes.schema.js";
import { notesRepository } from "./notes.repository.js";
import { HttpError } from "../shared/http-error.js";
import { sendResponse } from "../shared/send-response.js";
import { validateRequest } from "../shared/validate-request.js";

export const notesRouter = Router();

notesRouter.get("/", async (_request, response) => {
  const notes = await notesRepository.list();
  return sendResponse(response, 200, { notes });
});

notesRouter.post(
  "/",
  validateRequest(createNoteSchema, "body"),
  async (_request, response) => {
    const input = response.locals.validated.body as CreateNoteInput;
    const note = await notesRepository.create(input);
    return sendResponse(response, 201, { note });
  }
);

notesRouter.get(
  "/:id",
  validateRequest(noteIdParamsSchema, "params"),
  async (_request, response) => {
    const { id } = response.locals.validated.params as NoteIdParams;
    const note = await notesRepository.findById(id);

    if (!note) {
      throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found.");
    }

    return sendResponse(response, 200, { note });
  }
);

notesRouter.patch(
  "/:id",
  validateRequest(noteIdParamsSchema, "params"),
  validateRequest(updateNoteSchema, "body"),
  async (_request, response) => {
    const { id } = response.locals.validated.params as NoteIdParams;
    const input = response.locals.validated.body as UpdateNoteInput;
    const note = await notesRepository.update(id, input);

    if (!note) {
      throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found.");
    }

    return sendResponse(response, 200, { note });
  }
);

notesRouter.delete(
  "/:id",
  validateRequest(noteIdParamsSchema, "params"),
  async (_request, response) => {
    const { id } = response.locals.validated.params as NoteIdParams;
    const deleted = await notesRepository.delete(id);

    if (!deleted) {
      throw new HttpError(404, "NOTE_NOT_FOUND", "Note not found.");
    }

    response.status(204).end();
  }
);
