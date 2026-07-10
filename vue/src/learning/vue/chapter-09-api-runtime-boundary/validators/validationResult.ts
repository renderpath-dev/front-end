import type { z } from "zod";
import { formatZodError } from "./zodErrorFormatter";

export type ValidationSuccess<Value> = {
  success: true;
  data: Value;
};

export type ValidationFailure = {
  success: false;
  issues: ReadonlyArray<string>;
};

export type ValidationResult<Value> =
  | ValidationSuccess<Value>
  | ValidationFailure;

export function validateUnknown<Value>(
  schema: z.ZodType<Value>,
  value: unknown,
): ValidationResult<Value> {
  const result = schema.safeParse(value);

  if (!result.success) {
    return {
      success: false,
      issues: formatZodError(result.error),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
