export type PublicErrorDetails = Array<{
  path: string;
  message: string;
}>;

export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: PublicErrorDetails;

  constructor(statusCode: number, code: string, message: string, details?: PublicErrorDetails) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
