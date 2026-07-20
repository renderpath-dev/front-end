import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNote, deleteNote, getNote, listNotes, updateNote } from "./notes.controller.js";
import { createNoteSchema, noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export const notesRouter = Router();

notesRouter.get("/", listNotes);
notesRouter.post("/", validateRequest("body", createNoteSchema), createNote);
notesRouter.get("/:id", validateRequest("params", noteIdParamsSchema), getNote);
notesRouter.patch("/:id", validateRequest("params", noteIdParamsSchema), validateRequest("body", updateNoteSchema), updateNote);
notesRouter.delete("/:id", validateRequest("params", noteIdParamsSchema), deleteNote);
