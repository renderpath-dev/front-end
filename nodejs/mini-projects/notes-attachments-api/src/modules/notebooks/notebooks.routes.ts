import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { notebookNotesRoutes } from "../notes/notebook-notes.routes.js";
import * as controller from "./notebooks.controller.js";
import { createNotebookSchema, notebookParamsSchema, updateNotebookSchema } from "./notebooks.schema.js";

export const notebookRoutes = Router();

notebookRoutes.get("/", controller.list);
notebookRoutes.post("/", validateRequest({ body: createNotebookSchema }), controller.create);
notebookRoutes.use("/:notebookId/notes", notebookNotesRoutes);
notebookRoutes.get("/:notebookId", validateRequest({ params: notebookParamsSchema }), controller.getById);
notebookRoutes.put("/:notebookId", validateRequest({ params: notebookParamsSchema, body: updateNotebookSchema }), controller.updateById);
notebookRoutes.delete("/:notebookId", validateRequest({ params: notebookParamsSchema }), controller.removeById);
