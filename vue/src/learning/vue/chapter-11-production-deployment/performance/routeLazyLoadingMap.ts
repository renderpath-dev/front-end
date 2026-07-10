export interface LazyRouteRecord {
  readonly routeName: string;
  readonly routePath: string;
  readonly loaderOwner: string;
  readonly chunkReason: string;
}

export const chapterSixLazyRoutes: ReadonlyArray<LazyRouteRecord> = [
  {
    routeName: "learningHome",
    routePath: "/",
    loaderOwner: "lazyRouteComponents.learningHome",
    chunkReason:
      "The learning home view is resolved through a route component loader",
  },
  {
    routeName: "dashboard",
    routePath: "/router/dashboard",
    loaderOwner: "lazyRouteComponents.dashboard",
    chunkReason:
      "Dashboard code is only needed after the Router lab is visited",
  },
  {
    routeName: "users",
    routePath: "/router/users",
    loaderOwner: "lazyRouteComponents.users",
    chunkReason: "User management route can be split from initial shell code",
  },
  {
    routeName: "roles",
    routePath: "/router/roles",
    loaderOwner: "lazyRouteComponents.roles",
    chunkReason: "Role management route is not required for first paint",
  },
  {
    routeName: "orders",
    routePath: "/router/orders",
    loaderOwner: "lazyRouteComponents.orders",
    chunkReason: "Order management route is a feature boundary",
  },
  {
    routeName: "login",
    routePath: "/router/login",
    loaderOwner: "lazyRouteComponents.login",
    chunkReason: "Login view is resolved on demand",
  },
];
