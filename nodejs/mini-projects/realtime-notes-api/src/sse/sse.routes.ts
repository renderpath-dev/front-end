import { Router } from "express";
import { validateRequest } from "../shared/validation/validate-request.js";
import { noteParamsSchema } from "../modules/notes/notes.schema.js";
import { connectNoteEvents, connectUserEvents } from "./sse.controller.js";

export const sseRoutes = Router();

sseRoutes.get("/", connectUserEvents);
sseRoutes.get("/notes/:noteId", validateRequest({ params: noteParamsSchema }), connectNoteEvents);
