import { z } from "zod";
import type { LoginRequestBody } from "../../shared/types/auth";

export interface ContactRequestBody {
  readonly email: string;
  readonly message: string;
}

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const contactSchema = z.object({
  email: z.email(),
  message: z.string().min(10).max(400),
});

export function parseLoginBody(input: unknown): LoginRequestBody {
  return loginSchema.parse(input);
}

export function parseContactBody(input: unknown): ContactRequestBody {
  return contactSchema.parse(input);
}

export function isValidationFailure(error: unknown): boolean {
  return error instanceof z.ZodError;
}
