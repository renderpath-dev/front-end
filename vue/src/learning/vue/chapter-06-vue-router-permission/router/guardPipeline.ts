import type { Router } from "vue-router";
import { evaluateAuthGuard } from "./authGuard";
import { evaluatePermissionGuard } from "./permissionGuard";
import { recordNavigationTrace } from "./navigationTrace";

export function registerGuardPipeline(router: Router): void {
  router.beforeEach((to, from) => {
    const authResult = evaluateAuthGuard(to);

    if (authResult !== true) {
      recordNavigationTrace({
        phase: "beforeEach",
        from: from.fullPath,
        to: to.fullPath,
        outcome: "auth redirect or cancellation",
      });
      return authResult;
    }

    const permissionResult = evaluatePermissionGuard(to);

    recordNavigationTrace({
      phase: "beforeEach",
      from: from.fullPath,
      to: to.fullPath,
      outcome:
        permissionResult === true
          ? "navigation allowed"
          : "permission redirect or cancellation",
    });

    return permissionResult;
  });

  router.beforeResolve((to, from) => {
    recordNavigationTrace({
      phase: "beforeResolve",
      from: from.fullPath,
      to: to.fullPath,
      outcome: "route components resolved",
    });

    return true;
  });

  router.afterEach((to, from, failure) => {
    recordNavigationTrace({
      phase: "afterEach",
      from: from.fullPath,
      to: to.fullPath,
      outcome: failure
        ? `navigation failure: ${failure.type}`
        : "navigation confirmed",
    });

    if (!failure) {
      document.title = `${to.meta.title} | Vue Router Lab`;
    }
  });
}
