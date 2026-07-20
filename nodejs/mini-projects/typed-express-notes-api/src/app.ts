import express from "express";
import { notesRouter } from "./notes/notes.routes.js";
import { errorMiddleware } from "./shared/error-middleware.js";
import { notFound } from "./shared/not-found.js";

export const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use("/notes", notesRouter);
app.use(notFound);
app.use(errorMiddleware);
