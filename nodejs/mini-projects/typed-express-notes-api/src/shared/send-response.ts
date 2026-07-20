import type { Response } from "express";
import type { SuccessResponse } from "../notes/notes.types.js";

export function sendResponse<T>(
  response: Response,
  statusCode: number,
  data: T
): Response<SuccessResponse<T>> {
  return response.status(statusCode).json({
    ok: true,
    data
  });
}
