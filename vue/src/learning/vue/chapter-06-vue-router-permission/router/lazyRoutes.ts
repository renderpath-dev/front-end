export const lazyRouteComponents = {
  learningHome: () => import("../views/LearningHomeView.vue"),
  adminLayout: () => import("../layouts/AdminRouterLayout.vue"),
  login: () => import("../views/LoginView.vue"),
  dashboard: () => import("../views/DashboardView.vue"),
  users: () => import("../views/UserListView.vue"),
  userDetail: () => import("../views/UserDetailView.vue"),
  roles: () => import("../views/RoleListView.vue"),
  orders: () => import("../views/OrderListView.vue"),
  forbidden: () => import("../views/ForbiddenView.vue"),
  notFound: () => import("../views/NotFoundView.vue"),
} as const;
