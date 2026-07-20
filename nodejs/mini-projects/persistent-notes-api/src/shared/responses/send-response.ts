import type { Response } from "express";

export type SuccessResponse<TData> = {
  ok: true;
  data: TData;
};

export function sendResponse<TData>(response: Response, statusCode: number, data: TData) {
  response.status(statusCode).json({
    ok: true,
    data
  } satisfies SuccessResponse<TData>);
}
