import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "../stores/authStore";
import { usePermissionStore } from "../stores/permissionStore";
import { activateFreshPinia } from "./piniaStoreTest";

describe("permission store", () => {
  beforeEach(() => {
    activateFreshPinia();
  });

  it("derives access from the auth store without duplicating user state", () => {
    const authStore = useAuthStore();
    const permissionStore = usePermissionStore();

    authStore.signInAs("operator");

    expect(permissionStore.hasRole(["operator"])).toBe(true);
    expect(permissionStore.hasPermission(["orders:view"])).toBe(true);
    expect(permissionStore.hasPermission(["roles:view"])).toBe(false);
  });

  it("evaluates route meta as client navigation policy", () => {
    const authStore = useAuthStore();
    const permissionStore = usePermissionStore();
    const roleMeta = {
      requiresAuth: true,
      requiredRoles: ["admin"] as const,
      requiredPermissions: ["roles:view"] as const,
    };

    expect(permissionStore.canAccessRouteMeta(roleMeta)).toBe(false);

    authStore.signInAs("admin");

    expect(permissionStore.canAccessRouteMeta(roleMeta)).toBe(true);
  });
});
