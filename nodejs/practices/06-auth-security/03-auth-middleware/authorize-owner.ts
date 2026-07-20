export type AuthContext = {
  userId: string;
  role: "USER" | "ADMIN";
};

export function canReadOwnedResource(auth: AuthContext, ownerId: string): boolean {
  return auth.role === "ADMIN" || auth.userId === ownerId;
}

console.log(canReadOwnedResource({ userId: "user_1", role: "USER" }, "user_2"));
