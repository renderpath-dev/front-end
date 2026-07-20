import type { ErrorRequestHandler } from "express";
import type { ErrorResponse } from "../notes/notes.types.js";
import { HttpError } from "./http-error.js";

function isJsonParseError(error: unknown): boolean {
  return (
    error instanceof SyntaxError &&
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 400
  );
}

export const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  next
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  let statusCode = 500;
  let code = "INTERNAL_ERROR";
  let message = "Internal server error.";
  let details: unknown = null;

  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
    details = error.details;
  } else if (isJsonParseError(error)) {
    statusCode = 400;
    code = "INVALID_JSON";
    message = "Request body must contain valid JSON.";
  } else {
    console.error(error);
  }

  const body: ErrorResponse = {
    ok: false,
    error: { code, message, details }
  };

  response.status(statusCode).json(body);
};
