import express from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { notebooksRoutes } from "./modules/notebooks/notebooks.routes.js";
import { notebookNotesRoutes } from "./modules/notes/notebook-notes.routes.js";
import { notesRoutes } from "./modules/notes/notes.routes.js";
import { exportsRoutes } from "./modules/exports/exports.routes.js";
import { authenticateSession } from "./shared/auth/authenticate-session.js";
import { requireCsrfToken } from "./shared/auth/csrf.js";
import { requireAuthContext } from "./shared/auth/auth-context.js";
import { inspectNotebookListCache } from "./cache/notebook-cache.js";
import { clearUserCache } from "./cache/cache-invalidation.js";
import { corsMiddleware } from "./shared/middleware/cors.js";
import { notFound } from "./shared/middleware/not-found.js";
import { requestId } from "./shared/middleware/request-id.js";
import { securityHeaders } from "./shared/middleware/security-headers.js";
import { sendResponse } from "./shared/responses/send-response.js";
import { errorMiddleware } from "./shared/errors/error-middleware.js";

export const app = express();

app.use(requestId);
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => {
  sendResponse(response, 200, { status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/notebooks/:notebookId/notes", notebookNotesRoutes);
app.use("/notes", notesRoutes);
app.use("/exports", exportsRoutes);

app.get("/cache/debug/notebooks", authenticateSession, async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, await inspectNotebookListCache(auth.userId));
  } catch (error) {
    next(error);
  }
});

app.post("/cache/debug/clear", authenticateSession, requireCsrfToken, async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await clearUserCache(auth.userId);
    sendResponse(response, 200, { cleared: true });
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorMiddleware);
