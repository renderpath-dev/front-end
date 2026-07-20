import type { Response } from "express";

export function sendResponse<T>(response: Response, statusCode: number, data: T): void {
  response.status(statusCode).json({
    ok: true,
    data,
    requestId: response.locals.requestId
  });
}
