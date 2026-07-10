<script setup lang="ts">
import { computed } from "vue";
import { usePermissionStore } from "../stores/permissionStore";
import type { RouteAccessMeta } from "../stores/storeTypes";

const permissionStore = usePermissionStore();

const roleRouteMeta: RouteAccessMeta = {
  requiresAuth: true,
  requiredRoles: ["admin"],
  requiredPermissions: ["roles:view"],
};

const orderRouteMeta: RouteAccessMeta = {
  requiresAuth: true,
  requiredRoles: ["admin", "manager", "operator"],
  requiredPermissions: ["orders:view"],
};

const canOpenRoles = computed(() =>
  permissionStore.canAccessRouteMeta(roleRouteMeta),
);
const canOpenOrders = computed(() =>
  permissionStore.canAccessRouteMeta(orderRouteMeta),
);
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Setup Store composition</p>
    <h2>Permission store</h2>
    <p>{{ permissionStore.visiblePermissionSummary }}</p>
    <ul>
      <li>Role management: {{ canOpenRoles ? "allowed" : "blocked" }}</li>
      <li>Order management: {{ canOpenOrders ? "allowed" : "blocked" }}</li>
    </ul>
    <p class="warning">
      These checks control client navigation and visibility. The backend must
      authorize every protected operation independently.
    </p>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #fde68a;
  border-radius: 1rem;
  background: #fffbeb;
}

.eyebrow {
  margin: 0;
  color: #a16207;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

.warning {
  padding: 0.75rem;
  border-left: 4px solid #d97706;
  background: #ffffff;
  line-height: 1.5;
}
</style>
