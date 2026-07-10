import type { NormalizedApiError } from "./apiErrors";
import type { MockBackendScenario } from "./mockBackendScenarios";

export type HttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export type ApiEndpointName =
  | "products:list"
  | "products:detail"
  | "products:create"
  | "products:update"
  | "products:delete"
  | "users:list"
  | "users:create"
  | "orders:list"
  | "orders:status"
  | "uploads:create"
  | "auth:session";

export type ApiRetryConfig = {
  maxAttempts: number;
  baseDelayMs: number;
  allowUnsafeMethod: boolean;
};

export type ApiTimeoutConfig = {
  timeoutMs: number;
};

export type ApiRequestMeta = {
  endpointName: ApiEndpointName;
  requestId?: string;
  startedAt?: number;
  attempt?: number;
};

export type ApiRequestConfig = {
  method: HttpMethod;
  url: string;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeout?: number;
  retry?: ApiRetryConfig;
  meta: ApiRequestMeta;
  scenario?: MockBackendScenario;
};

export type ApiCallOptions = {
  signal?: AbortSignal;
  timeout?: number;
  scenario?: MockBackendScenario;
};

export type ApiRawResponse = {
  data: unknown;
  status: number;
  requestId: string;
  durationMs: number;
};

export type ApiValidatedResponse<Value> = {
  data: Value;
  status: number;
  requestId: string;
  durationMs: number;
};

export type ApiResult<Value> =
  | {
      ok: true;
      data: Value;
      response: ApiValidatedResponse<Value>;
    }
  | {
      ok: false;
      error: NormalizedApiError;
    };
