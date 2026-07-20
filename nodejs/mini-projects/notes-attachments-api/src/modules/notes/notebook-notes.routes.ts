import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import * as controller from "./notes.controller.js";
import { createNoteSchema, listNotesQuerySchema, noteParamsSchema } from "./notes.schema.js";

export const notebookNotesRoutes = Router({ mergeParams: true });

notebookNotesRoutes.get("/", validateRequest({ params: noteParamsSchema.pick({ notebookId: true }), query: listNotesQuerySchema }), controller.list);
notebookNotesRoutes.post("/", validateRequest({ params: noteParamsSchema.pick({ notebookId: true }), body: createNoteSchema }), controller.create);
