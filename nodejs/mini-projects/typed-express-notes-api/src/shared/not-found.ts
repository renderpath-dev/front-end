import type { RequestHandler } from "express";
import { HttpError } from "./http-error.js";

export const notFound: RequestHandler = (request, _response, next) => {
  next(
    new HttpError(
      404,
      "ROUTE_NOT_FOUND",
      `Route ${request.method} ${request.originalUrl} was not found.`
    )
  );
};
