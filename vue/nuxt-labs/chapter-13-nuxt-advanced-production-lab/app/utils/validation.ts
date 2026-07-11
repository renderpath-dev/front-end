export interface ClientValidationResult {
  readonly valid: boolean;
  readonly message: string;
}

export function validateRequiredText(
  value: string,
  label: string,
): ClientValidationResult {
  if (value.trim().length === 0) {
    return {
      valid: false,
      message: `${label} is required.`,
    };
  }

  return {
    valid: true,
    message: `${label} is present.`,
  };
}
