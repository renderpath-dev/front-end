import type {
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { routeNames } from "./routeNames";

export function evaluateAuthGuard(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  const authStore = useAuthStore(pinia);

  if (
    to.meta.requiresAuth &&
    !authStore.isSignedIn &&
    to.name !== routeNames.login
  ) {
    return {
      name: routeNames.login,
      query: {
        redirect: to.fullPath,
      },
    };
  }

  return true;
}
