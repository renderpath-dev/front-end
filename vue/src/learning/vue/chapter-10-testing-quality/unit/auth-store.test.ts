import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";

describe("auth store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts signed out", () => {
    const store = useAuthStore();

    expect(store.isSignedIn).toBe(false);
    expect(store.displayName).toBe("Signed out");
    expect(store.role).toBeNull();
  });

  it.each([
    ["admin", "roles:view", true],
    ["manager", "users:view", true],
    ["operator", "users:view", false],
  ] as const)(
    "assigns the expected permissions for %s",
    (role, permission, expected) => {
      const authStore = useAuthStore();
      const permissionStore = usePermissionStore();

      authStore.signInAs(role);

      expect(authStore.role).toBe(role);
      expect(permissionStore.hasPermission([permission])).toBe(expected);
    },
  );

  it("clears the active session on sign out", () => {
    const store = useAuthStore();
    store.signInAs("admin");

    store.signOut();

    expect(store.currentUser).toBeNull();
    expect(store.signInStatus).toBe("signed-out");
  });
});
