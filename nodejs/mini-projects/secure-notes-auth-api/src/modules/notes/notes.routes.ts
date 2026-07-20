import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { noteIdParamsSchema, updateNoteSchema } from "./notes.schema.js";
import * as controller from "./notes.controller.js";

export const notesRoutes = Router();

notesRoutes.use(authenticateSession);
notesRoutes.get("/:noteId", validateRequest({ params: noteIdParamsSchema }), controller.getById);
notesRoutes.patch("/:noteId", requireCsrfToken, validateRequest({ params: noteIdParamsSchema, body: updateNoteSchema }), controller.updateById);
notesRoutes.delete("/:noteId", requireCsrfToken, validateRequest({ params: noteIdParamsSchema }), controller.removeById);
