export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR";

export interface ApiOk<TData> {
  readonly ok: true;
  readonly data: TData;
}

export interface ApiError {
  readonly ok: false;
  readonly code: ApiErrorCode;
  readonly message: string;
}

export type ApiResult<TData> = ApiOk<TData> | ApiError;
