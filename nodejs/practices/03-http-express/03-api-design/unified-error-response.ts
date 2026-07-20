type ErrorDetail = {
  path: string;
  message: string;
};

type ErrorResponse = {
  ok: false;
  error: {
    code: string;
    message: string;
    details: ErrorDetail[] | null;
  };
};

function createErrorResponse(
  code: string,
  message: string,
  details: ErrorDetail[] | null = null
): ErrorResponse {
  return {
    ok: false,
    error: { code, message, details }
  };
}

function logInternalError(error: unknown): void {
  console.error("Internal request failure:", error);
}

logInternalError(new Error("Database credentials must never reach the client."));
console.log(
  createErrorResponse("VALIDATION_ERROR", "Request validation failed.", [
    { path: "body.title", message: "Title is required." }
  ])
);
