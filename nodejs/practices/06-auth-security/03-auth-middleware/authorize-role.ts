export type Role = "USER" | "ADMIN";

export function hasRequiredRole(actualRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(actualRole);
}

console.log(hasRequiredRole("USER", ["ADMIN"]));
