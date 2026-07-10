export type RouteRole =
  | "guest"
  | "admin"
  | "manager"
  | "operator";

export type RoutePermission =
  | "dashboard:view"
  | "users:view"
  | "users:detail"
  | "roles:view"
  | "orders:view";

export type RouteLayout = "public" | "admin";

export type AppRouteMeta = {
  title: string;
  requiresAuth: boolean;
  requiredRoles: ReadonlyArray<RouteRole>;
  requiredPermissions: ReadonlyArray<RoutePermission>;
  showInMenu: boolean;
  menuLabel: string;
  menuOrder: number;
  layout: RouteLayout;
  breadcrumb: ReadonlyArray<string>;
};

declare module "vue-router" {
  interface RouteMeta extends AppRouteMeta {}
}

export {};
