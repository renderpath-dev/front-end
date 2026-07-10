import type { NormalizedApiError } from "../api/apiErrors";

export type ApiErrorPresentation = {
  title: string;
  description: string;
  severity: "info" | "warning" | "error";
  suggestedAction: string;
};

export function useApiErrorPresenter() {
  function present(
    error: NormalizedApiError,
  ): ApiErrorPresentation {
    const title = error.kind
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    const suggestedAction =
      error.kind === "unauthenticated"
        ? "Sign in and retry."
        : error.kind === "forbidden"
          ? "Request access from an administrator."
          : error.retryable
            ? "Retry the safe request."
            : "Review the request and validation details.";

    return {
      title,
      description: error.message,
      severity:
        error.kind === "canceled" ? "info" : error.status === 422 ? "warning" : "error",
      suggestedAction,
    };
  }

  return { present };
}
