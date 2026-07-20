import { z } from "zod";

const emailSchema = z.string().trim().email().max(320).transform((value) => value.toLowerCase());

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(12).max(128)
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128)
});
