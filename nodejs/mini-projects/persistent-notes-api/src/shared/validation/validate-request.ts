import type { RequestHandler, Response } from "express";
import type { ZodType } from "zod";
import { ZodError } from "zod";
import { HttpError, type PublicErrorDetails } from "../errors/http-error.js";

type RequestTarget = "body" | "params" | "query";

type ValidationStore = Partial<Record<RequestTarget, unknown>>;

function getValidationStore(response: Response): ValidationStore {
  const existingStore = response.locals.validated;

  if (existingStore && typeof existingStore === "object") {
    return existingStore as ValidationStore;
  }

  const store: ValidationStore = {};
  response.locals.validated = store;
  return store;
}

function toPublicDetails(error: ZodError): PublicErrorDetails {
  return error.issues.map((issue) => ({
    path: issue.path.map(String).join("."),
    message: issue.message
  }));
}

export function validateRequest(target: RequestTarget, schema: ZodType): RequestHandler {
  return (request, response, next) => {
    const value = request[target];
    const result = schema.safeParse(value);

    if (!result.success) {
      next(new HttpError(400, "VALIDATION_ERROR", "Invalid request", toPublicDetails(result.error)));
      return;
    }

    const store = getValidationStore(response);
    store[target] = result.data;
    next();
  };
}

export function getValidated<TValue>(response: Response, target: RequestTarget): TValue {
  const store = getValidationStore(response);

  if (!(target in store)) {
    throw new HttpError(500, "VALIDATION_STATE_MISSING", "Validated request data was missing");
  }

  return store[target] as TValue;
}
