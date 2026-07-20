import type { Role, User } from "../../generated/prisma/client.js";

export type UserRecord = User;

export type PublicUser = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
};
