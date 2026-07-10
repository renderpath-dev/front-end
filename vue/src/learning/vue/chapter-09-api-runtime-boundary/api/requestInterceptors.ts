import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { getDemoSessionHeaders } from "./apiSession";
import { recordTimelineEvent } from "./mockBackendScenarios";

let requestSequence = 0;

function nextRequestId(): string {
  requestSequence += 1;
  return `api-request-${requestSequence}`;
}

export function applyRequestMetadata(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  const requestId = nextRequestId();
  const startedAt = Date.now();
  const sessionHeaders = getDemoSessionHeaders();
  const endpointName =
    config.headers.get("X-Endpoint-Name")?.toString() ?? "unknown";

  config.headers.set("X-Request-Id", requestId);
  config.headers.set("X-Request-Started-At", String(startedAt));
  config.headers.set("X-Demo-Role", sessionHeaders["X-Demo-Role"]);
  config.headers.set("X-Demo-Session", sessionHeaders["X-Demo-Session"]);

  if (
    config.data !== undefined &&
    config.headers.get("Content-Type") === undefined
  ) {
    config.headers.set("Content-Type", "application/json");
  }

  recordTimelineEvent(
    requestId,
    "request-interceptor",
    `${endpointName} metadata and demo session headers attached`,
  );

  return config;
}

export function installRequestInterceptors(
  instance: AxiosInstance,
): void {
  instance.interceptors.request.use(applyRequestMetadata);
}
