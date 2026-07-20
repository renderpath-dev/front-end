export type Role = "USER" | "ADMIN";

export type PublicUser = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
};
