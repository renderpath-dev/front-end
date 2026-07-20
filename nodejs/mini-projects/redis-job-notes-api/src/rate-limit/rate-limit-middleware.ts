import type { RequestHandler } from "express";
import { config } from "../config/env.js";
import { HttpError } from "../shared/errors/http-error.js";
import { consumeExportRateLimit } from "./redis-fixed-window.js";

export const exportRateLimit: RequestHandler = async (request, response, next) => {
  const auth = response.locals.auth as { userId?: string } | undefined;
  const identity = auth?.userId ?? request.ip ?? "anonymous";

  try {
    const decision = await consumeExportRateLimit(identity);
    response.setHeader("x-rate-limit-limit", String(decision.limit));
    response.setHeader("x-rate-limit-remaining", String(Math.max(decision.limit - decision.count, 0)));
    response.setHeader("x-rate-limit-reset", String(decision.resetSeconds));

    if (!decision.allowed) {
      throw new HttpError(429, "Too many export requests.", "EXPORT_RATE_LIMITED");
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }

    if (config.RATE_LIMIT_FAILURE_POLICY === "closed") {
      next(new HttpError(503, "Rate limiter is unavailable.", "RATE_LIMIT_UNAVAILABLE"));
      return;
    }

    response.setHeader("x-rate-limit-policy", "fail-open");
    next();
  }
};
