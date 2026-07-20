import type { RequestHandler } from "express";
import { HttpError } from "../errors/http-error.js";

export const notFoundMiddleware: RequestHandler = (request) => {
  throw new HttpError(404, "ROUTE_NOT_FOUND", `Route ${request.method} ${request.path} was not found`);
};
