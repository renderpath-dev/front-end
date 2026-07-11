export interface SubmitRequest {
  readonly productId: string;
  readonly email: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly value?: SubmitRequest;
  readonly message?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseSubmitRequest(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return {
      valid: false,
      message: "Request body must be an object.",
    };
  }

  const productId = body.productId;
  const email = body.email;

  if (typeof productId !== "string" || productId.length === 0) {
    return {
      valid: false,
      message: "productId is required.",
    };
  }

  if (typeof email !== "string" || !isEmail(email)) {
    return {
      valid: false,
      message: "email must be a valid address.",
    };
  }

  return {
    valid: true,
    value: {
      productId,
      email,
    },
  };
}
