import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { deleteNote, getNote, updateNote } from "./notes.controller.js";
import { noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export const notesRouter = Router();

notesRouter.get("/:noteId", validateRequest("params", noteIdParamsSchema), getNote);
notesRouter.patch(
  "/:noteId",
  validateRequest("params", noteIdParamsSchema),
  validateRequest("body", updateNoteSchema),
  updateNote
);
notesRouter.delete("/:noteId", validateRequest("params", noteIdParamsSchema), deleteNote);
