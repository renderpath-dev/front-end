import {
  AxiosError,
  AxiosHeaders,
  CanceledError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { describe, expect, it } from "vitest";
import {
  normalizeApiError,
  normalizeValidationError,
} from "../../chapter-09-api-runtime-boundary/api/apiErrors";
import { productDtoSchema } from "../../chapter-09-api-runtime-boundary/validators/productValidator";

function createHttpError(status: number): AxiosError {
  const config: InternalAxiosRequestConfig = {
    headers: new AxiosHeaders(),
  };
  const response: AxiosResponse = {
    data: {
      error: { code: `HTTP_${status}`, message: `Request failed: ${status}` },
      requestId: `request-${status}`,
    },
    status,
    statusText: "Request failed",
    headers: new AxiosHeaders(),
    config,
  };

  return new AxiosError(
    `Request failed: ${status}`,
    undefined,
    config,
    undefined,
    response,
  );
}

describe("normalizeApiError", () => {
  it("distinguishes network, timeout, and canceled transport failures", () => {
    const network = normalizeApiError(
      new AxiosError("Network Error", "ERR_NETWORK"),
    );
    const timeout = normalizeApiError(
      new AxiosError("Timeout", "ECONNABORTED"),
    );
    const canceled = normalizeApiError(new CanceledError("Canceled"));

    expect(network.kind).toBe("network");
    expect(timeout.kind).toBe("timeout");
    expect(timeout.retryable).toBe(true);
    expect(canceled.kind).toBe("canceled");
  });

  it.each([
    [401, "unauthenticated"],
    [403, "forbidden"],
    [404, "not-found"],
    [422, "validation"],
    [500, "server"],
  ] as const)("maps HTTP %i to %s", (status, kind) => {
    const normalized = normalizeApiError(createHttpError(status));

    expect(normalized.kind).toBe(kind);
    expect(normalized.status).toBe(status);
    expect(normalized.requestId).toBe(`request-${status}`);
  });

  it("marks malformed response data as an invalid response", () => {
    const parsed = productDtoSchema.safeParse({
      id: "product-1",
      product_name: "Keyboard",
      unit_price: "129",
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const normalized = normalizeValidationError(parsed.error);
      expect(normalized.kind).toBe("invalid-response");
      expect(normalized.details.length).toBeGreaterThan(0);
    }
  });
});
