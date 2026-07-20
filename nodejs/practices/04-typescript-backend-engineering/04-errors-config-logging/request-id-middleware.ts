import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestIdMiddleware: RequestHandler = (request, response, next) => {
  const incomingRequestId = request.header("x-request-id");
  const requestId = incomingRequestId && incomingRequestId.trim().length > 0
    ? incomingRequestId
    : randomUUID();

  response.locals.requestId = requestId;
  response.setHeader("x-request-id", requestId);
  next();
};

export function getRequestId(responseLocals: { requestId?: unknown }): string | undefined {
  return typeof responseLocals.requestId === "string" ? responseLocals.requestId : undefined;
}
