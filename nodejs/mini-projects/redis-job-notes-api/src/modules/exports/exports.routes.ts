import { Router } from "express";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { exportRateLimit } from "../../rate-limit/rate-limit-middleware.js";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { createExportSchema, exportParamsSchema } from "./exports.schema.js";
import * as controller from "./exports.controller.js";

export const exportsRoutes = Router();

exportsRoutes.use(authenticateSession);
exportsRoutes.post("/", requireCsrfToken, exportRateLimit, validateRequest({ body: createExportSchema }), controller.create);
exportsRoutes.get("/:exportId", validateRequest({ params: exportParamsSchema }), controller.get);
