import { argon2, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

type StoredHash = {
  memory: number;
  passes: number;
  parallelism: number;
  tagLength: number;
  nonce: Buffer;
  tag: Buffer;
};

type Argon2Parameters = {
  message: Buffer;
  nonce: Buffer;
  parallelism: number;
  memory: number;
  passes: number;
  tagLength: number;
};

const argon2Async = promisify(argon2) as unknown as (
  algorithm: "argon2id",
  parameters: Argon2Parameters
) => Promise<Buffer>;

function parseStoredHash(storedHash: string): StoredHash {
  const parts = storedHash.split("$");
  const values = new Map(parts.slice(2).map((part) => part.split("=", 2) as [string, string]));

  return {
    memory: Number(values.get("m")),
    passes: Number(values.get("t")),
    parallelism: Number(values.get("p")),
    tagLength: Number(values.get("l")),
    nonce: Buffer.from(values.get("s") ?? "", "base64url"),
    tag: Buffer.from(values.get("h") ?? "", "base64url")
  };
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parsed = parseStoredHash(storedHash);
  const candidate = await argon2Async("argon2id", {
    message: Buffer.from(password, "utf8"),
    nonce: parsed.nonce,
    memory: parsed.memory,
    passes: parsed.passes,
    parallelism: parsed.parallelism,
    tagLength: parsed.tagLength
  });

  return candidate.length === parsed.tag.length && timingSafeEqual(candidate, parsed.tag);
}
