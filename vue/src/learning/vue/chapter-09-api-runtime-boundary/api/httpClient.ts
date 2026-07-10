import axios, { AxiosHeaders } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { z } from "zod";
import { normalizeApiError, normalizeValidationError } from "./apiErrors";
import type {
  ApiRawResponse,
  ApiRequestConfig,
  ApiResult,
} from "./httpTypes";
import { mockAxiosAdapter } from "./mockAxiosAdapter";
import {
  recordTimelineEvent,
} from "./mockBackendScenarios";
import { installRequestInterceptors } from "./requestInterceptors";
import { installResponseInterceptors } from "./responseInterceptors";
import { defaultTimeoutConfig } from "./timeoutPolicy";

const apiClient = axios.create({
  baseURL: "/chapter-09-api",
  timeout: defaultTimeoutConfig.timeoutMs,
  adapter: mockAxiosAdapter,
});

installRequestInterceptors(apiClient);
installResponseInterceptors(apiClient);

function toAxiosConfig(
  config: ApiRequestConfig,
): AxiosRequestConfig<unknown> {
  return {
    method: config.method,
    url: config.url,
    params: config.params,
    data: config.body,
    headers: {
      ...config.headers,
      "X-Endpoint-Name": config.meta.endpointName,
      "X-Demo-Scenario": config.scenario ?? "success",
    },
    signal: config.signal,
    timeout: config.timeout,
  };
}

export async function requestUnknown(
  config: ApiRequestConfig,
): Promise<ApiRawResponse> {
  recordTimelineEvent(
    "pending",
    "request-created",
    `${config.meta.endpointName} request config created`,
  );

  const response = await apiClient.request<
    unknown,
    AxiosResponse<unknown>,
    unknown
  >(toAxiosConfig(config));
  const responseHeaders = AxiosHeaders.from(response.headers);
  const requestId =
    responseHeaders.get("X-Request-Id")?.toString() ?? "unknown";
  const durationMs = Number(
    responseHeaders.get("X-Duration-Ms") ?? 0,
  );

  return {
    data: response.data,
    status: response.status,
    requestId,
    durationMs,
  };
}

export async function requestValidated<Value>(
  schema: z.ZodType<Value>,
  config: ApiRequestConfig,
): Promise<ApiResult<Value>> {
  try {
    const rawResponse = await requestUnknown(config);
    const validation = schema.safeParse(rawResponse.data);

    if (!validation.success) {
      recordTimelineEvent(
        rawResponse.requestId,
        "validation-failed",
        config.meta.endpointName,
      );
      return {
        ok: false,
        error: normalizeValidationError(validation.error),
      };
    }

    recordTimelineEvent(
      rawResponse.requestId,
      "validation-passed",
      config.meta.endpointName,
    );
    recordTimelineEvent(
      rawResponse.requestId,
      "completed",
      config.meta.endpointName,
    );

    return {
      ok: true,
      data: validation.data,
      response: {
        data: validation.data,
        status: rawResponse.status,
        requestId: rawResponse.requestId,
        durationMs: rawResponse.durationMs,
      },
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error: normalizeApiError(error),
    };
  }
}
