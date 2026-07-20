import "dotenv/config";
import path from "node:path";
import { z } from "zod";

const rawEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().int().min(1).max(65535).default(3008),
  CORS_ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  SESSION_COOKIE_NAME: z.string().min(1).default("notes_attachments_session"),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  SESSION_TTL_SECONDS: z.coerce.number().int().min(60).default(28800),
  MAX_UPLOAD_BYTES: z.coerce.number().int().min(1).max(20 * 1024 * 1024).default(5 * 1024 * 1024),
  STORAGE_ROOT: z.string().min(1).default("./storage/objects"),
  TEMP_UPLOAD_DIR: z.string().min(1).default("./storage/tmp")
});

const parsed = rawEnvSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(z.prettifyError(parsed.error));
}

const raw = parsed.data;

export const config = {
  ...raw,
  CORS_ALLOWED_ORIGINS: raw.CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean),
  STORAGE_ROOT: path.resolve(process.cwd(), raw.STORAGE_ROOT),
  TEMP_UPLOAD_DIR: path.resolve(process.cwd(), raw.TEMP_UPLOAD_DIR)
};
