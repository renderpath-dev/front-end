import { randomUUID } from "node:crypto";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { config } from "../config/env.js";

export async function ensureUploadDirectories(): Promise<void> {
  await mkdir(config.TEMP_UPLOAD_DIR, { recursive: true });
  await mkdir(config.STORAGE_ROOT, { recursive: true });
}

export function createTempUploadPath(): string {
  return path.join(config.TEMP_UPLOAD_DIR, `${randomUUID()}.upload`);
}

export async function removeTempFile(filePath: string | undefined): Promise<void> {
  if (!filePath) {
    return;
  }

  await rm(filePath, { force: true });
}
