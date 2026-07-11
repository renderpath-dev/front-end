import type { SafeUser } from "../../shared/types/auth";

export function createSessionPayload(user: SafeUser) {
  return {
    user,
    loggedInAt: new Date().toISOString(),
    secure: {
      reportAccessReason: `role:${user.role}`,
    },
  };
}
