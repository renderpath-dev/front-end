import { z } from "zod";

const booleanFromString = z.union([z.boolean(), z.string()]).transform((value) => {
  if (typeof value === "boolean") {
    return value;
  }

  return value.toLowerCase() === "true";
});

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
  PORT: z.coerce.number().int().positive().default(3007),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  SESSION_COOKIE_NAME: z.string().min(1).default("redis_job_notes_session"),
  COOKIE_SECURE: booleanFromString.default(false),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 8),
  CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(60),
  EXPORT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  EXPORT_RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_FAILURE_POLICY: z.enum(["open", "closed"]).default("open")
});

export const config = envSchema.parse(process.env);

export const allowedCorsOrigins = config.CORS_ALLOWED_ORIGINS
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
