import type { PublicUser } from "../users/users.types.js";

export type AuthRequestMetadata = {
  userAgent?: string;
  ip?: string;
};

export type AuthResult = {
  user: PublicUser;
  sessionToken: string;
};
