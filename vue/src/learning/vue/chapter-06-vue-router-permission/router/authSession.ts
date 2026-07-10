import { computed } from "vue";
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import type { DemoUser } from "../../chapter-07-pinia-state-management/stores/storeTypes";
import type {
  RoutePermission,
  RouteRole,
} from "./routeMeta";

export type { DemoUser };

export const currentUser = computed<DemoUser | null>(
  () => useAuthStore(pinia).currentUser,
);

export function signInAs(role: RouteRole): void {
  const authStore = useAuthStore(pinia);

  if (role === "guest") {
    authStore.signOut();
  } else {
    authStore.signInAs(role);
  }
}

export function signOut(): void {
  useAuthStore(pinia).signOut();
}

export function hasRole(
  requiredRoles: readonly RouteRole[] | undefined,
): boolean {
  return usePermissionStore(pinia).hasRole(requiredRoles);
}

export function hasPermission(
  requiredPermissions: readonly RoutePermission[] | undefined,
): boolean {
  return usePermissionStore(pinia).hasPermission(requiredPermissions);
}
