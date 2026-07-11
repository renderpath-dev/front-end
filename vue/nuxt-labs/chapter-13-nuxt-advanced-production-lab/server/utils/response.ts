import type { ApiErrorCode, ApiResult } from "../../shared/types/api";

export function ok<TData>(data: TData): ApiResult<TData> {
  return { ok: true, data };
}

export function fail(
  code: ApiErrorCode,
  message: string,
): ApiResult<never> {
  return { ok: false, code, message };
}
