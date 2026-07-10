import "./routeMeta";
import "./typedRoutes";
import {
  createRouter,
  createWebHistory,
} from "vue-router";
import { registerGuardPipeline } from "./guardPipeline";
import { routeRecords } from "./routes";
import { scrollBehavior } from "./scrollBehavior";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeRecords,
  scrollBehavior,
});

registerGuardPipeline(router);
