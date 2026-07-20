import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
import type { RequestHandler } from "express";
import { logger } from "../logging/logger.js";

export const requestIdMiddleware: RequestHandler = (request, response, next) => {
  const startedAt = performance.now();
  const incomingRequestId = request.header("x-request-id");
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0
    ? incomingRequestId
    : randomUUID();

  response.locals.requestId = requestId;
  response.setHeader("x-request-id", requestId);

  response.once("finish", () => {
    logger.info("request completed", {
      requestId,
      method: request.method,
      path: request.originalUrl,
      statusCode: response.statusCode,
      durationMs: Math.round(performance.now() - startedAt)
    });
  });

  next();
};
