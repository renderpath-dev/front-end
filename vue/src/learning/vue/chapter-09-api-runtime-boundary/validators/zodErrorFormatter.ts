import type { z } from "zod";

export function formatZodError(
  error: z.ZodError,
): ReadonlyArray<string> {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "value";
    return `${path}: ${issue.message}`;
  });
}
