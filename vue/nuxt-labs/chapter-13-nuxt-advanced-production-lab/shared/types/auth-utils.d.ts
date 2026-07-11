import type { SafeUser } from "./auth";

declare module "#auth-utils" {
  interface User extends SafeUser {}

  interface UserSession {
    loggedInAt?: string;
  }

  interface SecureSessionData {
    reportAccessReason?: string;
  }
}

export {};
