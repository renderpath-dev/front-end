import { AxiosHeaders } from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { normalizeApiError } from "./apiErrors";
import { recordTimelineEvent } from "./mockBackendScenarios";

export function applyResponseMetadata(
  response: AxiosResponse<unknown>,
): AxiosResponse<unknown> {
  const requestId =
    response.config.headers.get("X-Request-Id")?.toString() ?? "unknown";
  const startedAt = Number(
    response.config.headers.get("X-Request-Started-At") ?? Date.now(),
  );
  const durationMs = Math.max(0, Date.now() - startedAt);
  const headers = AxiosHeaders.from(response.headers);

  headers.set("X-Request-Id", requestId);
  headers.set("X-Duration-Ms", String(durationMs));
  response.headers = headers;

  recordTimelineEvent(
    requestId,
    "response-received",
    `HTTP ${response.status} received after ${durationMs}ms`,
  );

  return response;
}

export function installResponseInterceptors(
  instance: AxiosInstance,
): void {
  instance.interceptors.response.use(
    applyResponseMetadata,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  );
}
