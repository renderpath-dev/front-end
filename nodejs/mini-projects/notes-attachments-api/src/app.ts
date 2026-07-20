import express from "express";
import { authenticateSession } from "./shared/auth/authenticate-session.js";
import { requireCsrfToken } from "./shared/auth/csrf.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";
import { corsMiddleware } from "./shared/middleware/cors.js";
import { notFound } from "./shared/middleware/not-found.js";
import { apiRateLimit } from "./shared/middleware/rate-limit.js";
import { requestId } from "./shared/middleware/request-id.js";
import { securityHeaders } from "./shared/middleware/security-headers.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { notebookRoutes } from "./modules/notebooks/notebooks.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { attachmentRoutes, noteAttachmentsRoutes } from "./modules/attachments/attachments.routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(requestId);
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(apiRateLimit);
app.use(express.json({ limit: "1mb" }));

app.use("/auth", authRoutes);
app.use("/notes/:noteId/attachments", authenticateSession, noteAttachmentsRoutes);
app.use("/attachments", authenticateSession, attachmentRoutes);
app.use("/notebooks", authenticateSession, requireCsrfToken, notebookRoutes);
app.use("/notes", authenticateSession, requireCsrfToken, notesRoutes);

app.use(notFound);
app.use(errorMiddleware);
