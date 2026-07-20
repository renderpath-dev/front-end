import type { ZodType } from "zod";

export type CacheReadResult<T> =
  | { status: "HIT"; value: T }
  | { status: "MISS" }
  | { status: "BYPASS"; reason: string };

export function serializeCacheValue(value: unknown): string {
  return JSON.stringify(value);
}

export function parseCacheValue<T>(raw: string | null, schema: ZodType<T>): CacheReadResult<T> {
  if (raw === null) {
    return { status: "MISS" };
  }

  try {
    return { status: "HIT", value: schema.parse(JSON.parse(raw)) };
  } catch (error) {
    return { status: "BYPASS", reason: error instanceof Error ? error.message : "cache parse error" };
  }
}
