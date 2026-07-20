type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown> & {
  requestId?: string;
};

type SerializedError = {
  name: string;
  message: string;
  code?: string;
};

function serializeError(error: unknown): SerializedError | undefined {
  if (error === undefined) {
    return undefined;
  }

  if (error instanceof Error) {
    const maybeCode = "code" in error && typeof error.code === "string" ? error.code : undefined;
    return { name: error.name, message: error.message, code: maybeCode };
  }

  return { name: "UnknownError", message: "Non-error value was thrown" };
}

function log(level: LogLevel, message: string, context: LogContext = {}, error?: unknown): void {
  const entry = {
    level,
    message,
    requestId: context.requestId,
    context,
    error: serializeError(error)
  };

  console.log(JSON.stringify(entry));
}

log("info", "request completed", { requestId: "req_123", method: "GET", path: "/notes", statusCode: 200 });
log("error", "request failed", { requestId: "req_456", method: "POST", path: "/notes" }, new Error("Invalid request"));
