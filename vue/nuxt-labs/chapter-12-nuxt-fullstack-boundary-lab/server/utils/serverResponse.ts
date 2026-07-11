import type { ApiError, ApiErrorCode, ApiOk } from "../../shared/types/api";

export function ok<T>(data: T): ApiOk<T> {
  return {
    ok: true,
    data,
  };
}

export function fail(code: ApiErrorCode, message: string): ApiError {
  return {
    ok: false,
    code,
    message,
  };
}
