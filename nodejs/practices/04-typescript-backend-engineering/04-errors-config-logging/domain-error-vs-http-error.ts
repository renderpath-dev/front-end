type DomainErrorCode = "NOTE_NOT_FOUND" | "TITLE_REQUIRED";

type DomainError = {
  code: DomainErrorCode;
  message: string;
};

type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: DomainError };

class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

function mapDomainErrorToHttpError(error: DomainError): HttpError {
  if (error.code === "NOTE_NOT_FOUND") {
    return new HttpError(404, error.code, "Note was not found");
  }

  return new HttpError(400, error.code, "Invalid note input");
}

function getNote(id: string): ServiceResult<{ id: string; title: string }> {
  if (id !== "note_1") {
    return {
      ok: false,
      error: { code: "NOTE_NOT_FOUND", message: "Repository returned undefined for note lookup" }
    };
  }

  return { ok: true, data: { id, title: "Typed errors" } };
}

const result = getNote("missing");

if (!result.ok) {
  const httpError = mapDomainErrorToHttpError(result.error);
  console.log({ statusCode: httpError.statusCode, code: httpError.code, message: httpError.message });
}
