export type ApiErrorCode = "not_found" | "validation_error" | "server_error";

export interface ApiOk<T> {
  readonly ok: true;
  readonly data: T;
}

export interface ApiError {
  readonly ok: false;
  readonly code: ApiErrorCode;
  readonly message: string;
}

export type ApiResult<T> = ApiOk<T> | ApiError;
