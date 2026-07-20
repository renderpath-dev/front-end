import { z } from "zod";

const email = z.string().trim().toLowerCase().email().max(320);
const password = z.string().min(15).max(128);

export const registerSchema = z.object({
  email,
  password
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1).max(128)
});
