import type { NormalizedApiError } from "./apiErrors";
import type {
  ApiRetryConfig,
  HttpMethod,
} from "./httpTypes";

const safeMethods: ReadonlySet<HttpMethod> = new Set(["GET", "HEAD"]);

export const defaultRetryConfig: ApiRetryConfig = {
  maxAttempts: 3,
  baseDelayMs: 120,
  allowUnsafeMethod: false,
};

export function isIdempotentMethod(method: HttpMethod): boolean {
  return safeMethods.has(method);
}

export function shouldRetryRequest(
  method: HttpMethod,
  error: NormalizedApiError,
  attempt: number,
  config: ApiRetryConfig = defaultRetryConfig,
): boolean {
  if (attempt >= config.maxAttempts) {
    return false;
  }

  if (!isIdempotentMethod(method) && !config.allowUnsafeMethod) {
    return false;
  }

  if (
    error.kind === "unauthenticated" ||
    error.kind === "forbidden" ||
    error.kind === "validation" ||
    error.kind === "bad-request" ||
    error.kind === "conflict"
  ) {
    return false;
  }

  return error.retryable;
}

export function getRetryDelay(
  attempt: number,
  config: ApiRetryConfig = defaultRetryConfig,
): number {
  return config.baseDelayMs * attempt;
}
