import type { DemoRole } from "../../shared/types/auth";

export default defineNuxtRouteMiddleware((to) => {
  const role = useState<DemoRole>("demo-role", () => "guest");
  role.value = to.query.allow === "admin" ? "admin" : "guest";
});
