import {
  AxiosError,
  AxiosHeaders,
  CanceledError,
} from "axios";
import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { normalizeTimeout } from "./timeoutPolicy";
import {
  isMockBackendScenario,
  recordTimelineEvent,
} from "./mockBackendScenarios";
import type { MockBackendScenario } from "./mockBackendScenarios";
import { handleMockBackend } from "./mockBackendRoutes";
import type { HttpMethod } from "./httpTypes";

function readHeader(
  config: InternalAxiosRequestConfig,
  name: string,
  fallback: string,
): string {
  return config.headers.get(name)?.toString() ?? fallback;
}

function toHttpMethod(value: string | undefined): HttpMethod {
  const method = value?.toUpperCase();
  if (
    method === "HEAD" ||
    method === "POST" ||
    method === "PUT" ||
    method === "PATCH" ||
    method === "DELETE"
  ) {
    return method;
  }
  return "GET";
}

function parseBody(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function toQuery(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return {};
  }

  return Object.fromEntries(Object.entries(value));
}

function getScenario(
  config: InternalAxiosRequestConfig,
): MockBackendScenario {
  const value = config.headers.get("X-Demo-Scenario");
  return isMockBackendScenario(value) ? value : "success";
}

function getLatency(
  scenario: MockBackendScenario,
  timeout: number,
): number {
  if (scenario === "timeout") return timeout + 200;
  if (scenario === "slow") return 1_000;
  return 120;
}

function waitForAdapter(
  config: InternalAxiosRequestConfig,
  delayMs: number,
  timeoutMs: number,
  requestId: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let settled = false;

    const finish = (callback: () => void): void => {
      if (settled) return;
      settled = true;
      clearTimeout(delayTimer);
      clearTimeout(timeoutTimer);
      config.signal?.removeEventListener("abort", cancel);
      callback();
    };

    const cancel = (): void => {
      recordTimelineEvent(
        requestId,
        "request-canceled",
        "AbortSignal canceled the adapter",
      );
      finish(() =>
        reject(new CanceledError("Request canceled", config)),
      );
    };

    const delayTimer = setTimeout(
      () => finish(resolve),
      delayMs,
    );
    const timeoutTimer = setTimeout(() => {
      recordTimelineEvent(requestId, "timeout", `${timeoutMs}ms timeout`);
      finish(() =>
        reject(
          new AxiosError(
            `timeout of ${timeoutMs}ms exceeded`,
            AxiosError.ETIMEDOUT,
            config,
          ),
        ),
      );
    }, timeoutMs);

    if (config.signal?.aborted) {
      cancel();
      return;
    }

    config.signal?.addEventListener("abort", cancel, { once: true });
  });
}

export const mockAxiosAdapter: AxiosAdapter = async (config) => {
  const requestId = readHeader(config, "X-Request-Id", "unknown");
  const scenario = getScenario(config);
  const timeout = normalizeTimeout(config.timeout);

  recordTimelineEvent(
    requestId,
    "adapter-started",
    `${toHttpMethod(config.method)} ${config.url ?? "/"}`,
  );

  await waitForAdapter(
    config,
    getLatency(scenario, timeout),
    timeout,
    requestId,
  );

  if (scenario === "networkError") {
    throw new AxiosError(
      "Simulated network error",
      AxiosError.ERR_NETWORK,
      config,
    );
  }

  const backendResponse = handleMockBackend({
    method: toHttpMethod(config.method),
    url: config.url ?? "/",
    query: toQuery(config.params),
    body: parseBody(config.data),
    requestId,
    role: readHeader(config, "X-Demo-Role", "guest"),
    scenario,
  });

  const response: AxiosResponse<unknown> = {
    data: backendResponse.data,
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: AxiosHeaders.from({}),
    config,
  };

  if (backendResponse.status < 200 || backendResponse.status >= 300) {
    throw new AxiosError(
      backendResponse.statusText,
      backendResponse.status >= 500
        ? AxiosError.ERR_BAD_RESPONSE
        : AxiosError.ERR_BAD_REQUEST,
      config,
      undefined,
      response,
    );
  }

  return response;
};
