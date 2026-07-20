import express from "express";
import { notesRouter } from "./modules/notes/notes.routes.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { notFoundMiddleware } from "./shared/middleware/not-found.js";
import { requestIdMiddleware } from "./shared/middleware/request-id.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestIdMiddleware);
app.use(express.json({ limit: "32kb" }));
app.use("/notes", notesRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
