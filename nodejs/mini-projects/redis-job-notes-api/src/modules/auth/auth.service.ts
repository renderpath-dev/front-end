import { createHash } from "node:crypto";
import { mapPrismaError } from "../../db/prisma-errors.js";
import { HttpError } from "../../shared/errors/http-error.js";
import { hashPassword, verifyPassword } from "../../shared/auth/password-hashing.js";
import { createSessionToken, hashSessionToken } from "../../shared/auth/session-token.js";
import { createSession, revokeSession } from "./auth.repository.js";
import { createUser, findUserByEmail, toPublicUser } from "../users/users.repository.js";
import type { AuthResult, LoginInput, RegisterInput } from "./auth.types.js";

const invalidCredentials = new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");

export async function register(input: RegisterInput, metadata: { userAgent?: string; ip?: string }): Promise<AuthResult> {
  const passwordHash = await hashPassword(input.password);

  try {
    const user = await createUser({
      email: input.email,
      passwordHash
    });
    const sessionToken = createSessionToken();
    await createSession({
      userId: user.id,
      tokenHash: hashSessionToken(sessionToken),
      userAgent: metadata.userAgent,
      ipHash: metadata.ip ? hashIp(metadata.ip) : undefined
    });

    return {
      user: toPublicUser(user),
      sessionToken
    };
  } catch (error) {
    mapPrismaError(error, "EMAIL_ALREADY_REGISTERED");
  }
}

export async function login(input: LoginInput, metadata: { userAgent?: string; ip?: string }): Promise<AuthResult> {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw invalidCredentials;
  }

  const verified = await verifyPassword(input.password, user.passwordHash);
  if (!verified) {
    throw invalidCredentials;
  }

  const sessionToken = createSessionToken();
  await createSession({
    userId: user.id,
    tokenHash: hashSessionToken(sessionToken),
    userAgent: metadata.userAgent,
    ipHash: metadata.ip ? hashIp(metadata.ip) : undefined
  });

  return {
    user: toPublicUser(user),
    sessionToken
  };
}

export async function logout(sessionId: string): Promise<void> {
  await revokeSession(sessionId);
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip, "utf8").digest("base64url");
}
