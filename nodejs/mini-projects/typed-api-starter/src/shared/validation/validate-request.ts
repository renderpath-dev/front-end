import type { RequestHandler, Response } from "express";
import type { ZodType } from "zod";
import { HttpError } from "../errors/http-error.js";

type RequestTarget = "body" | "params" | "query";

type ValidatedLocals = {
  validated?: Partial<Record<RequestTarget, unknown>>;
};

export function validateRequest<TOutput>(target: RequestTarget, schema: ZodType<TOutput>): RequestHandler {
  return (request, response, next) => {
    const result = schema.safeParse(request[target]);

    if (!result.success) {
      next(new HttpError(400, "VALIDATION_ERROR", "Invalid request", result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))));
      return;
    }

    const locals = response.locals as ValidatedLocals;
    locals.validated ??= {};
    locals.validated[target] = result.data;
    next();
  };
}

export function getValidated<TOutput>(response: Response, target: RequestTarget): TOutput {
  const locals = response.locals as ValidatedLocals;
  const value = locals.validated?.[target];

  if (value === undefined) {
    throw new HttpError(500, "VALIDATION_STATE_ERROR", "Validated request data was not found");
  }

  return value as TOutput;
}
