import type { ErrorRequestHandler } from "express";
import { HttpError, isHttpError } from "./http-error.js";
import { logger } from "../logging/logger.js";

type BodyParserError = SyntaxError & {
  status?: number;
  type?: string;
};

function isBodyParserError(error: unknown): error is BodyParserError {
  return error instanceof SyntaxError
    && typeof (error as BodyParserError).status === "number"
    && (error as BodyParserError).type === "entity.parse.failed";
}

function toPublicError(error: unknown): HttpError {
  if (isHttpError(error)) {
    return error;
  }

  if (isBodyParserError(error)) {
    return new HttpError(400, "INVALID_JSON", "Invalid JSON body");
  }

  return new HttpError(500, "INTERNAL_ERROR", "Internal server error");
}

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const publicError = toPublicError(error);
  const requestId = typeof response.locals.requestId === "string" ? response.locals.requestId : undefined;

  logger.error("request failed", {
    requestId,
    method: request.method,
    path: request.originalUrl,
    statusCode: publicError.statusCode,
    code: publicError.code
  }, error);

  response.status(publicError.statusCode).json({
    ok: false,
    error: {
      code: publicError.code,
      message: publicError.message,
      details: publicError.details
    }
  });
};
