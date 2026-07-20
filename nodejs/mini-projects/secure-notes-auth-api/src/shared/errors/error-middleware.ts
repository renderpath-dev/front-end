import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "./http-error.js";
import { logger } from "../logging/logger.js";

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      ok: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed.",
        details: error.issues
      },
      requestId: response.locals.requestId
    });
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: []
      },
      requestId: response.locals.requestId
    });
    return;
  }

  logger.error({ requestId: response.locals.requestId, error }, "Unhandled request error");
  response.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error.",
      details: []
    },
    requestId: response.locals.requestId
  });
};
