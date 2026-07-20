import "dotenv/config";
import { z } from "zod";

function numberFromEnv(defaultValue: number): z.ZodType<number> {
  return z.preprocess((value) => {
    if (value === undefined || value === "") return defaultValue;
    return Number(value);
  }, z.number().int().positive());
}

function splitOrigins(value: string): string[] {
  return value.split(",").map((origin) => origin.trim()).filter(Boolean);
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: numberFromEnv(3009),
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/realtime_notes_api"),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  SESSION_COOKIE_NAME: z.string().min(1).default("realtime_notes_session"),
  SESSION_TTL_SECONDS: numberFromEnv(604800),
  CSRF_COOKIE_NAME: z.string().min(1).default("realtime_notes_csrf"),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000,http://127.0.0.1:3000"),
  WS_MAX_PAYLOAD_BYTES: numberFromEnv(8192),
  WS_BACKPRESSURE_LIMIT_BYTES: numberFromEnv(1048576),
  HEARTBEAT_INTERVAL_MS: numberFromEnv(25000)
});

const parsed = envSchema.parse(process.env);

export const config = {
  ...parsed,
  ALLOWED_ORIGINS: splitOrigins(parsed.ALLOWED_ORIGINS),
  COOKIE_SECURE: parsed.NODE_ENV === "production"
} as const;
