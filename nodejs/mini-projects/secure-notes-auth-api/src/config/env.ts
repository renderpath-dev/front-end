import { z } from "zod";

const booleanFromString = z.union([z.boolean(), z.string()]).transform((value) => {
  if (typeof value === "boolean") {
    return value;
  }

  return value.toLowerCase() === "true";
});

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  SESSION_COOKIE_NAME: z.string().min(1).default("secure_notes_session"),
  COOKIE_SECURE: booleanFromString.default(false),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 8)
});

export const config = envSchema.parse(process.env);

export const allowedCorsOrigins = config.CORS_ALLOWED_ORIGINS
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
