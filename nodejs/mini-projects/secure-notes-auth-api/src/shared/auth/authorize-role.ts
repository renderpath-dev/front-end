import type { RequestHandler } from "express";
import type { Role } from "./auth-context.js";
import { requireAuthContext } from "./auth-context.js";
import { HttpError } from "../errors/http-error.js";

export function authorizeRole(...allowedRoles: Role[]): RequestHandler {
  return (_request, response, next) => {
    try {
      const auth = requireAuthContext(response);
      if (!allowedRoles.includes(auth.role)) {
        throw new HttpError(403, "This action requires a different role.", "FORBIDDEN_ROLE");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
