import { Router } from "express";
import { validateRequest } from "../../shared/validation/validate-request.js";
import { authenticateSession } from "../../shared/auth/authenticate-session.js";
import { requireCsrfToken } from "../../shared/auth/csrf.js";
import { loginRateLimit } from "../../shared/middleware/rate-limit.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import * as controller from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", validateRequest({ body: registerSchema }), controller.register);
authRoutes.post("/login", loginRateLimit, validateRequest({ body: loginSchema }), controller.login);
authRoutes.post("/logout", authenticateSession, requireCsrfToken, controller.logout);
authRoutes.get("/me", authenticateSession, controller.me);
authRoutes.get("/csrf", authenticateSession, controller.csrf);
