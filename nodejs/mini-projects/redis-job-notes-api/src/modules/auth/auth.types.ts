import type { PublicUser } from "../users/users.types.js";

export type RegisterInput = {
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResult = {
  user: PublicUser;
  sessionToken: string;
};
