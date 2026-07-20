import { argon2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

type Argon2Parameters = {
  message: Buffer;
  nonce: Buffer;
  parallelism: number;
  memory: number;
  passes: number;
  tagLength: number;
};

type ParsedPasswordHash = {
  memory: number;
  passes: number;
  parallelism: number;
  tagLength: number;
  nonce: Buffer;
  tag: Buffer;
};

const CURRENT_PARAMETERS = {
  memory: 65536,
  passes: 3,
  parallelism: 4,
  tagLength: 32
};

const argon2Async = promisify(argon2) as unknown as (
  algorithm: "argon2id",
  parameters: Argon2Parameters
) => Promise<Buffer>;

export async function hashPassword(password: string): Promise<string> {
  const nonce = randomBytes(16);
  const tag = await argon2Async("argon2id", {
    message: Buffer.from(password, "utf8"),
    nonce,
    ...CURRENT_PARAMETERS
  });

  return [
    "secure-notes",
    "argon2id",
    "v=1",
    "m=" + CURRENT_PARAMETERS.memory,
    "t=" + CURRENT_PARAMETERS.passes,
    "p=" + CURRENT_PARAMETERS.parallelism,
    "l=" + CURRENT_PARAMETERS.tagLength,
    "s=" + nonce.toString("base64url"),
    "h=" + tag.toString("base64url")
  ].join("$");
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const parsed = parsePasswordHash(storedHash);
    const candidateTag = await argon2Async("argon2id", {
      message: Buffer.from(password, "utf8"),
      nonce: parsed.nonce,
      memory: parsed.memory,
      passes: parsed.passes,
      parallelism: parsed.parallelism,
      tagLength: parsed.tagLength
    });

    return candidateTag.length === parsed.tag.length && timingSafeEqual(candidateTag, parsed.tag);
  } catch {
    return false;
  }
}

export function shouldUpgradePasswordHash(storedHash: string): boolean {
  const parsed = parsePasswordHash(storedHash);
  return parsed.memory !== CURRENT_PARAMETERS.memory
    || parsed.passes !== CURRENT_PARAMETERS.passes
    || parsed.parallelism !== CURRENT_PARAMETERS.parallelism
    || parsed.tagLength !== CURRENT_PARAMETERS.tagLength;
}

function parsePasswordHash(storedHash: string): ParsedPasswordHash {
  const parts = storedHash.split("$");
  if (parts.length !== 9 || parts[0] !== "secure-notes" || parts[1] !== "argon2id") {
    throw new Error("Unsupported password hash format.");
  }

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
