import axios from "axios";
import type { z } from "zod";
import { apiErrorEnvelopeSchema } from "../validators/apiEnvelopeValidator";
import { formatZodError } from "../validators/zodErrorFormatter";

export type ApiErrorKind =
  | "bad-request"
  | "network"
  | "timeout"
  | "canceled"
  | "unauthenticated"
  | "forbidden"
  | "not-found"
  | "conflict"
  | "validation"
  | "server"
  | "invalid-response"
  | "unknown";

export type NormalizedApiError = {
  normalized: true;
  kind: ApiErrorKind;
  message: string;
  status: number | null;
  requestId: string | null;
  details: ReadonlyArray<string>;
  retryable: boolean;
};

function createNormalizedError(
  kind: ApiErrorKind,
  message: string,
  options: {
    status?: number | null;
    requestId?: string | null;
    details?: ReadonlyArray<string>;
    retryable?: boolean;
  } = {},
): NormalizedApiError {
  return {
    normalized: true,
    kind,
    message,
    status: options.status ?? null,
    requestId: options.requestId ?? null,
    details: options.details ?? [],
    retryable: options.retryable ?? false,
  };
}

export function normalizeHttpStatus(status: number): ApiErrorKind {
  if (status === 400) return "bad-request";
  if (status === 401) return "unauthenticated";
  if (status === 403) return "forbidden";
  if (status === 404) return "not-found";
  if (status === 409) return "conflict";
  if (status === 422) return "validation";
  if (status >= 500) return "server";
  return "unknown";
}

export function normalizeValidationError(
  error: z.ZodError,
  kind: "invalid-response" | "validation" = "invalid-response",
): NormalizedApiError {
  return createNormalizedError(
    kind,
    kind === "invalid-response"
      ? "The response did not match the endpoint contract."
      : "The outgoing payload did not match the endpoint contract.",
    {
      details: formatZodError(error),
    },
  );
}

export function isNormalizedApiError(
  value: unknown,
): value is NormalizedApiError {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "normalized" in value && value.normalized === true;
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (isNormalizedApiError(error)) {
    return error;
  }

  if (axios.isCancel(error) || (axios.isAxiosError(error) && error.code === "ERR_CANCELED")) {
    return createNormalizedError("canceled", "The request was canceled.");
  }

  if (axios.isAxiosError<unknown>(error)) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return createNormalizedError("timeout", "The request timed out.", {
        retryable: true,
      });
    }

    if (!error.response) {
      return createNormalizedError("network", "The transport could not reach the service.", {
        retryable: true,
      });
    }

    const status = error.response.status;
    const kind = normalizeHttpStatus(status);
    const parsedEnvelope = apiErrorEnvelopeSchema.safeParse(
      error.response.data,
    );
    const requestId = parsedEnvelope.success
      ? parsedEnvelope.data.requestId
      : null;
    const message = parsedEnvelope.success
      ? parsedEnvelope.data.error.message
      : `The request failed with HTTP ${status}.`;
    const details = parsedEnvelope.success
      ? Object.entries(parsedEnvelope.data.error.fieldErrors ?? {}).flatMap(
          ([field, messages]) =>
            messages.map((entry) => `${field}: ${entry}`),
        )
      : [];

    return createNormalizedError(kind, message, {
      status,
      requestId,
      details,
      retryable: kind === "server",
    });
  }

  if (error instanceof Error) {
    return createNormalizedError("unknown", error.message);
  }

  return createNormalizedError("unknown", "An unknown request error occurred.");
}
