import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createNotebookSchema, notebookParamsSchema, updateNotebookSchema } from "./notebooks.schema.js";
import * as controller from "./notebooks.controller.js";

export const notebooksRoutes = Router();

notebooksRoutes.use(authenticateSession);
notebooksRoutes.get("/", controller.list);
notebooksRoutes.post("/", requireCsrfToken, validateRequest({ body: createNotebookSchema }), controller.create);
notebooksRoutes.get("/:notebookId", validateRequest({ params: notebookParamsSchema }), controller.get);
notebooksRoutes.patch("/:notebookId", requireCsrfToken, validateRequest({ params: notebookParamsSchema, body: updateNotebookSchema }), controller.update);
notebooksRoutes.delete("/:notebookId", requireCsrfToken, validateRequest({ params: notebookParamsSchema }), controller.remove);
