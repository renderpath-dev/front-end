import type { Response } from "express";

export type ApiSuccess<TData> = {
  ok: true;
  data: TData;
};

export function sendResponse<TData>(response: Response, statusCode: number, data: TData): void {
  response.status(statusCode).json({
    ok: true,
    data
  } satisfies ApiSuccess<TData>);
}
