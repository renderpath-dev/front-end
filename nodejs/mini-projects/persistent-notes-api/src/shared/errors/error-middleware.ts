import type { ErrorRequestHandler } from "express";
import { HttpError } from "./http-error.js";
import { logger } from "../logging/logger.js";

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  const requestId = typeof response.locals.requestId === "string" ? response.locals.requestId : undefined;

  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details ?? []
      }
    });
    return;
  }

  logger.error("Unhandled request failure", {
    requestId,
    method: request.method,
    path: request.path
  }, error);

  response.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error",
      details: []
    }
  });
};
