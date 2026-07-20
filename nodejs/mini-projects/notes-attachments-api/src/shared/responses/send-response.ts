import type { Response } from "express";

export function sendResponse(response: Response, status: number, data: unknown): void {
  response.status(status).json({ data });
}
