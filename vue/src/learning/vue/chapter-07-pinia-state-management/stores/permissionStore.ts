import { computed } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import type {
  DemoPermission,
  DemoUserRole,
  RouteAccessMeta,
} from "./storeTypes";

export const usePermissionStore = defineStore("permissions", () => {
  const authStore = useAuthStore();

  function hasRole(
    requiredRoles: ReadonlyArray<DemoUserRole | "guest"> | undefined,
  ): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.includes("guest") && !authStore.isSignedIn) {
      return true;
    }

    return (
      authStore.role !== null &&
      requiredRoles.includes(authStore.role)
    );
  }

  function hasPermission(
    requiredPermissions: ReadonlyArray<DemoPermission> | undefined,
  ): boolean {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    return requiredPermissions.every((permission) =>
      authStore.permissions.includes(permission),
    );
  }

  function canAccessRouteMeta(meta: RouteAccessMeta): boolean {
    if (meta.requiresAuth && !authStore.isSignedIn) {
      return false;
    }

    return (
      hasRole(meta.requiredRoles) &&
      hasPermission(meta.requiredPermissions)
    );
  }

  const visiblePermissionSummary = computed(() => {
    if (!authStore.isSignedIn) {
      return "No active permissions";
    }

    return `${authStore.role}: ${authStore.permissions.join(", ")}`;
  });

  return {
    hasRole,
    hasPermission,
    canAccessRouteMeta,
    visiblePermissionSummary,
  };
});
