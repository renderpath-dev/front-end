import type { RouteRecordInfo } from "vue-router";

export interface RouteNamedMap {
  "learning-home": RouteRecordInfo<
    "learning-home",
    "/",
    Record<never, never>,
    Record<never, never>,
    never
  >;
  "router-login": RouteRecordInfo<
    "router-login",
    "/router/login",
    Record<never, never>,
    Record<never, never>,
    never
  >;
  "router-dashboard": RouteRecordInfo<
    "router-dashboard",
    "/router/dashboard",
    Record<never, never>,
    Record<never, never>,
    never
  >;
  "router-users": RouteRecordInfo<
    "router-users",
    "/router/users",
    Record<never, never>,
    Record<never, never>,
    "router-user-detail"
  >;
  "router-user-detail": RouteRecordInfo<
    "router-user-detail",
    "/router/users/:userId",
    { userId: string },
    { userId: string },
    never
  >;
  "router-roles": RouteRecordInfo<
    "router-roles",
    "/router/roles",
    Record<never, never>,
    Record<never, never>,
    never
  >;
  "router-orders": RouteRecordInfo<
    "router-orders",
    "/router/orders",
    Record<never, never>,
    Record<never, never>,
    never
  >;
  "router-forbidden": RouteRecordInfo<
    "router-forbidden",
    "/router/403",
    Record<never, never>,
    Record<never, never>,
    never
  >;
  "router-not-found": RouteRecordInfo<
    "router-not-found",
    "/:pathMatch(.*)*",
    { pathMatch?: string | ReadonlyArray<string> },
    { pathMatch: ReadonlyArray<string> },
    never
  >;
}

declare module "vue-router" {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }
}

export {};
