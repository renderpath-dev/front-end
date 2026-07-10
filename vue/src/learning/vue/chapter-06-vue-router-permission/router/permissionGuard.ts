import type {
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import { routeNames } from "./routeNames";

export function evaluatePermissionGuard(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  const permissionStore = usePermissionStore(pinia);
  const accessAllowed = permissionStore.canAccessRouteMeta(to.meta);

  if (
    to.meta.requiresAuth &&
    !accessAllowed &&
    to.name !== routeNames.forbidden
  ) {
    return {
      name: routeNames.forbidden,
      query: {
        from: to.fullPath,
      },
    };
  }

  return true;
}
