import express from "express";
import { notebooksRouter } from "./modules/notebooks/notebooks.routes.js";
import { notesRouter } from "./modules/notes/notes.routes.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { notFoundMiddleware } from "./shared/middleware/not-found.js";
import { requestIdMiddleware } from "./shared/middleware/request-id.js";
import { sendResponse } from "./shared/responses/send-response.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestIdMiddleware);
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => {
  sendResponse(response, 200, { status: "ok" });
});

app.use("/notebooks", notebooksRouter);
app.use("/notes", notesRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
