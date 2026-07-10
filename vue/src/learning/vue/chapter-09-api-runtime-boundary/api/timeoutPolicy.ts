import type { ApiTimeoutConfig } from "./httpTypes";

export const defaultTimeoutConfig: ApiTimeoutConfig = {
  timeoutMs: 1_500,
};

export function normalizeTimeout(
  timeout: number | undefined,
): number {
  if (timeout === undefined || !Number.isFinite(timeout) || timeout <= 0) {
    return defaultTimeoutConfig.timeoutMs;
  }

  return Math.floor(timeout);
}
