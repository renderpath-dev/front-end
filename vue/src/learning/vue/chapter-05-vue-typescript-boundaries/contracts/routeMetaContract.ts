export type RoutePermission =
  | "products:read"
  | "products:edit"
  | "products:archive";

export type RouteMetaContract = {
  title: string;
  requiresAuth: boolean;
  requiredPermissions: ReadonlyArray<RoutePermission>;
};

export type RouteRecordContract = {
  path: string;
  name: string;
  meta: RouteMetaContract;
};

export const productRouteContract = {
  path: "/products",
  name: "products",
  meta: {
    title: "Products",
    requiresAuth: true,
    requiredPermissions: ["products:read"],
  },
} satisfies RouteRecordContract;
