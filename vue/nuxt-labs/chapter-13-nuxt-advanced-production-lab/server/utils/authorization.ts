import type { SafeUser, UserRole } from "../../shared/types/auth";
import { createError } from "h3";

export function hasRole(user: SafeUser, role: UserRole): boolean {
  return user.role === role;
}

export function requireRole(user: SafeUser, role: UserRole): void {
  if (!hasRole(user, role)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
      message: "The active session does not have the required role.",
    });
  }
}
