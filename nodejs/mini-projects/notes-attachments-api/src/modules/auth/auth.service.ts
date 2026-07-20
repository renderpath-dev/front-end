import { HttpError } from "../../shared/errors/http-error.js";
import { hashPassword, verifyPassword } from "../../shared/auth/password-hashing.js";
import { createSessionToken, hashIpAddress, hashSessionToken } from "../../shared/auth/session-token.js";
import * as userRepository from "../users/users.repository.js";
import * as authRepository from "./auth.repository.js";
import type { AuthRequestMetadata, AuthResult } from "./auth.types.js";

export async function register(input: { email: string; password: string }, metadata: AuthRequestMetadata): Promise<AuthResult> {
  const existingUser = await userRepository.findUserByEmail(input.email);
  if (existingUser) {
    throw new HttpError(409, "Email is already registered.", "EMAIL_TAKEN");
  }

  const user = await userRepository.createUser({
    email: input.email,
    passwordHash: await hashPassword(input.password)
  });

  const sessionToken = await createSession(user.id, metadata);
  return { user: userRepository.toPublicUser(user), sessionToken };
}

export async function login(input: { email: string; password: string }, metadata: AuthRequestMetadata): Promise<AuthResult> {
  const user = await userRepository.findUserByEmail(input.email);
  if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
    throw new HttpError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
  }

  const sessionToken = await createSession(user.id, metadata);
  return { user: userRepository.toPublicUser(user), sessionToken };
}

export async function logout(sessionId: string): Promise<void> {
  await authRepository.revokeSession(sessionId);
}

async function createSession(userId: string, metadata: AuthRequestMetadata): Promise<string> {
  const sessionToken = createSessionToken();
  await authRepository.createSession({
    userId,
    tokenHash: hashSessionToken(sessionToken),
    userAgent: metadata.userAgent,
    ipHash: hashIpAddress(metadata.ip)
  });
  return sessionToken;
}
