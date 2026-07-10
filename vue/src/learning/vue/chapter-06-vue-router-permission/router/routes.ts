import type { RouteRecordRaw } from "vue-router";
import { lazyRouteComponents } from "./lazyRoutes";
import { routeNames } from "./routeNames";

const knownUserIds = new Set(["u-100", "u-200", "u-300"]);

export const routeRecords: Array<RouteRecordRaw> = [
  {
    path: "/router",
    component: lazyRouteComponents.adminLayout,
    redirect: {
      name: routeNames.dashboard,
    },
    meta: {
      title: "Router Admin",
      requiresAuth: true,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Router Admin",
      menuOrder: 0,
      layout: "admin",
      breadcrumb: ["Router"],
    },
    children: [
      {
        path: "dashboard",
        alias: "/router/home",
        name: routeNames.dashboard,
        component: lazyRouteComponents.dashboard,
        meta: {
          title: "Dashboard",
          requiresAuth: true,
          requiredRoles: ["admin", "manager", "operator"],
          requiredPermissions: ["dashboard:view"],
          showInMenu: true,
          menuLabel: "Dashboard",
          menuOrder: 10,
          layout: "admin",
          breadcrumb: ["Dashboard"],
        },
      },
      {
        path: "users",
        name: routeNames.users,
        component: lazyRouteComponents.users,
        meta: {
          title: "User Management",
          requiresAuth: true,
          requiredRoles: ["admin", "manager"],
          requiredPermissions: ["users:view"],
          showInMenu: true,
          menuLabel: "Users",
          menuOrder: 20,
          layout: "admin",
          breadcrumb: ["Users"],
        },
      },
      {
        path: "users/:userId",
        name: routeNames.userDetail,
        component: lazyRouteComponents.userDetail,
        beforeEnter: (to) => {
          const userId = to.params.userId;

          if (
            typeof userId !== "string" ||
            !knownUserIds.has(userId)
          ) {
            return {
              name: routeNames.notFound,
              params: {
                pathMatch: to.path
                  .split("/")
                  .filter((segment) => segment.length > 0),
              },
            };
          }

          return true;
        },
        meta: {
          title: "User Detail",
          requiresAuth: true,
          requiredRoles: ["admin", "manager"],
          requiredPermissions: ["users:detail"],
          showInMenu: false,
          menuLabel: "User Detail",
          menuOrder: 21,
          layout: "admin",
          breadcrumb: ["Users", "Detail"],
        },
      },
      {
        path: "roles",
        name: routeNames.roles,
        component: lazyRouteComponents.roles,
        meta: {
          title: "Role Management",
          requiresAuth: true,
          requiredRoles: ["admin"],
          requiredPermissions: ["roles:view"],
          showInMenu: true,
          menuLabel: "Roles",
          menuOrder: 30,
          layout: "admin",
          breadcrumb: ["Roles"],
        },
      },
      {
        path: "orders",
        name: routeNames.orders,
        component: lazyRouteComponents.orders,
        meta: {
          title: "Order Management",
          requiresAuth: true,
          requiredRoles: ["admin", "manager", "operator"],
          requiredPermissions: ["orders:view"],
          showInMenu: true,
          menuLabel: "Orders",
          menuOrder: 40,
          layout: "admin",
          breadcrumb: ["Orders"],
        },
      },
    ],
  },
  {
    path: "/router/login",
    name: routeNames.login,
    component: lazyRouteComponents.login,
    meta: {
      title: "Router Login",
      requiresAuth: false,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Login",
      menuOrder: 90,
      layout: "public",
      breadcrumb: ["Login"],
    },
  },
  {
    path: "/router/403",
    name: routeNames.forbidden,
    component: lazyRouteComponents.forbidden,
    meta: {
      title: "Forbidden",
      requiresAuth: false,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Forbidden",
      menuOrder: 91,
      layout: "public",
      breadcrumb: ["Forbidden"],
    },
  },
  {
    path: "/router/legacy-users",
    redirect: {
      name: routeNames.users,
    },
  },
  {
    path: "/",
    name: routeNames.learningHome,
    component: lazyRouteComponents.learningHome,
    meta: {
      title: "Vue Learning Home",
      requiresAuth: false,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Learning Home",
      menuOrder: 0,
      layout: "public",
      breadcrumb: ["Learning Home"],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: routeNames.notFound,
    component: lazyRouteComponents.notFound,
    meta: {
      title: "Not Found",
      requiresAuth: false,
      requiredRoles: [],
      requiredPermissions: [],
      showInMenu: false,
      menuLabel: "Not Found",
      menuOrder: 99,
      layout: "public",
      breadcrumb: ["Not Found"],
    },
  },
];
