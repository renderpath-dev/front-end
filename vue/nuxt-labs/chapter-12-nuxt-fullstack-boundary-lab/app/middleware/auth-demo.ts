export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith("/admin") && to.query.allow !== "admin") {
    return navigateTo("/?admin=denied");
  }
});
