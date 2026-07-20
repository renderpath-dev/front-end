import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import type { ErrorDetail } from "../notes/notes.types.js";
import { HttpError } from "./http-error.js";

export type ValidationTarget = "body" | "params" | "query";

export const validateRequest = (
  schema: ZodType,
  target: ValidationTarget
): RequestHandler => {
  return (request, response, next) => {
    const input: unknown = request[target];
    const result = schema.safeParse(input);

    if (!result.success) {
      const details: ErrorDetail[] = result.error.issues.map((issue) => ({
        path: [target, ...issue.path].join("."),
        message: issue.message
      }));

      next(
        new HttpError(
          422,
          "VALIDATION_ERROR",
          "Request validation failed.",
          details
        )
      );
      return;
    }

    response.locals.validated ??= {};
    response.locals.validated[target] = result.data;
    next();
  };
};
