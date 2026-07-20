import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNotebook, deleteNotebook, getNotebook, listNotebooks, updateNotebook } from "./notebooks.controller.js";
import { createNotebookNote, listNotebookNotes } from "../notes/notes.controller.js";
import { createNotebookSchema, notebookIdParamsSchema, updateNotebookSchema } from "./notebooks.schema.js";
import { createNoteSchema, listNotesQuerySchema } from "../notes/notes.schema.js";

export const notebooksRouter = Router();

notebooksRouter.get("/", listNotebooks);
notebooksRouter.post("/", validateRequest("body", createNotebookSchema), createNotebook);
notebooksRouter.get("/:notebookId", validateRequest("params", notebookIdParamsSchema), getNotebook);
notebooksRouter.patch(
  "/:notebookId",
  validateRequest("params", notebookIdParamsSchema),
  validateRequest("body", updateNotebookSchema),
  updateNotebook
);
notebooksRouter.delete("/:notebookId", validateRequest("params", notebookIdParamsSchema), deleteNotebook);
notebooksRouter.get(
  "/:notebookId/notes",
  validateRequest("params", notebookIdParamsSchema),
  validateRequest("query", listNotesQuerySchema),
  listNotebookNotes
);
notebooksRouter.post(
  "/:notebookId/notes",
  validateRequest("params", notebookIdParamsSchema),
  validateRequest("body", createNoteSchema),
  createNotebookNote
);
