import type { ErrorRequestHandler } from "express";
import { isPrismaKnownRequestError } from "../../db/prisma-errors.js";
import { isHttpError } from "./http-error.js";

export const errorMiddleware: ErrorRequestHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (isHttpError(error)) {
    response.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details ?? []
      }
    });
    return;
  }

  if (isPrismaKnownRequestError(error)) {
    response.status(409).json({
      error: {
        code: error.code,
        message: "Database constraint violation.",
        details: []
      }
    });
    return;
  }

  response.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Internal server error.",
      details: []
    }
  });
};
