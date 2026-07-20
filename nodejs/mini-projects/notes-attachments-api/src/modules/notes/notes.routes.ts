import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import * as controller from "./notes.controller.js";
import { noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";

export const notesRoutes = Router();

notesRoutes.get("/:noteId", validateRequest({ params: noteIdParamsSchema }), controller.getById);
notesRoutes.patch("/:noteId", validateRequest({ params: noteIdParamsSchema, body: updateNoteSchema }), controller.updateById);
notesRoutes.delete("/:noteId", validateRequest({ params: noteIdParamsSchema }), controller.removeById);
