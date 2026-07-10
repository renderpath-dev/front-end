export const routeNames = {
  learningHome: "learning-home",
  login: "router-login",
  dashboard: "router-dashboard",
  users: "router-users",
  userDetail: "router-user-detail",
  roles: "router-roles",
  orders: "router-orders",
  forbidden: "router-forbidden",
  notFound: "router-not-found",
} as const;

export type AppRouteName =
  (typeof routeNames)[keyof typeof routeNames];

export const appRouteNames: ReadonlyArray<AppRouteName> =
  Object.values(routeNames);

export function isAppRouteName(value: unknown): value is AppRouteName {
  return (
    typeof value === "string" &&
    appRouteNames.some((routeName) => routeName === value)
  );
}
