import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNoteSchema, listNotesQuerySchema, notebookOnlyParamsSchema } from "./notes.schema.js";
import * as controller from "./notes.controller.js";

export const notebookNotesRoutes = Router({ mergeParams: true });

notebookNotesRoutes.use(authenticateSession);
notebookNotesRoutes.get("/", validateRequest({ params: notebookOnlyParamsSchema, query: listNotesQuerySchema }), controller.list);
notebookNotesRoutes.post("/", requireCsrfToken, validateRequest({ params: notebookOnlyParamsSchema, body: createNoteSchema }), controller.create);
