import { defineStore } from "pinia";
import type {
  DemoPermission,
  DemoUser,
  DemoUserRole,
} from "./storeTypes";

type SignInStatus = "signed-out" | "signed-in";

type AuthState = {
  currentUser: DemoUser | null;
  signInStatus: SignInStatus;
  lastSignInRole: DemoUserRole | null;
};

const demoUsers = {
  admin: {
    id: "admin-100",
    displayName: "Avery Admin",
    role: "admin",
    permissions: [
      "dashboard:view",
      "users:view",
      "users:detail",
      "roles:view",
      "orders:view",
    ],
  },
  manager: {
    id: "manager-200",
    displayName: "Morgan Manager",
    role: "manager",
    permissions: [
      "dashboard:view",
      "users:view",
      "users:detail",
      "orders:view",
    ],
  },
  operator: {
    id: "operator-300",
    displayName: "Owen Operator",
    role: "operator",
    permissions: ["dashboard:view", "orders:view"],
  },
} satisfies Record<DemoUserRole, DemoUser>;

function clonePermissions(
  permissions: ReadonlyArray<DemoPermission>,
): Array<DemoPermission> {
  return [...permissions];
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    currentUser: null,
    signInStatus: "signed-out",
    lastSignInRole: null,
  }),
  getters: {
    isSignedIn: (state): boolean =>
      state.signInStatus === "signed-in" && state.currentUser !== null,
    displayName: (state): string =>
      state.currentUser?.displayName ?? "Signed out",
    role: (state): DemoUserRole | null =>
      state.currentUser?.role ?? null,
    permissions: (state): ReadonlyArray<DemoPermission> =>
      state.currentUser?.permissions ?? [],
  },
  actions: {
    signInAs(role: DemoUserRole): void {
      const user = demoUsers[role];

      this.currentUser = {
        ...user,
        permissions: clonePermissions(user.permissions),
      };
      this.signInStatus = "signed-in";
      this.lastSignInRole = role;
    },
    signOut(): void {
      this.currentUser = null;
      this.signInStatus = "signed-out";
    },
  },
});
