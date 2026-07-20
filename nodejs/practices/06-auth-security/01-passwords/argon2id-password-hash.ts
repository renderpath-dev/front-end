import { argon2, randomBytes } from "node:crypto";
import { promisify } from "node:util";

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

const parameters = {
  parallelism: 4,
  memory: 65536,
  passes: 3,
  tagLength: 32
};

export async function hashPassword(password: string): Promise<string> {
  const nonce = randomBytes(16);
  const tag = await argon2Async("argon2id", {
    message: Buffer.from(password, "utf8"),
    nonce,
    ...parameters
  });

  return [
    "demo",
    "argon2id",
    "v=1",
    "m=" + parameters.memory,
    "t=" + parameters.passes,
    "p=" + parameters.parallelism,
    "l=" + parameters.tagLength,
    "s=" + nonce.toString("base64url"),
    "h=" + tag.toString("base64url")
  ].join("$");
}

async function main(): Promise<void> {
  console.log(await hashPassword("long-enough-passphrase"));
}

void main();
