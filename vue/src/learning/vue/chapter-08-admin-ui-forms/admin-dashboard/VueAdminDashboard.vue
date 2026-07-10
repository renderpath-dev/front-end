<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import { useAdminTabs } from "../composables/useAdminTabs";
import type { AdminRole, AdminTab } from "../contracts/adminUiTypes";
import AdminBreadcrumb from "../layout/AdminBreadcrumb.vue";
import AdminLayout from "../layout/AdminLayout.vue";
import AdminSidebar from "../layout/AdminSidebar.vue";
import AdminTabs from "../layout/AdminTabs.vue";
import AdminTopbar from "../layout/AdminTopbar.vue";
import AdminConfigProvider from "../theme/AdminConfigProvider.vue";
import DashboardHome from "./DashboardHome.vue";
import LoginPanel from "./LoginPanel.vue";
import OrderManagement from "./OrderManagement.vue";
import ProductManagement from "./ProductManagement.vue";
import RoleManagement from "./RoleManagement.vue";
import UploadManagement from "./UploadManagement.vue";
import UserManagement from "./UserManagement.vue";

const authStore = useAuthStore();
const permissionStore = usePermissionStore();
const { isSignedIn } = storeToRefs(authStore);
const { tabs, activeId, setActive } = useAdminTabs();

const tabRoles: Record<AdminTab["id"], ReadonlyArray<AdminRole>> = {
  dashboard: ["admin", "manager", "operator"],
  users: ["admin", "manager"],
  roles: ["admin"],
  products: ["admin", "manager"],
  orders: ["admin", "manager", "operator"],
  upload: ["admin", "manager"],
};

const visibleTabs = computed(() =>
  tabs.value.filter((tab) => permissionStore.hasRole(tabRoles[tab.id])),
);

const currentLabel = computed(
  () =>
    visibleTabs.value.find((tab) => tab.id === activeId.value)?.label ??
    "Dashboard",
);

watch(
  visibleTabs,
  (nextTabs) => {
    if (!nextTabs.some((tab) => tab.id === activeId.value)) {
      setActive("dashboard");
    }
  },
  { immediate: true },
);
</script>

<template>
  <AdminConfigProvider>
    <div class="dashboard-stack">
      <LoginPanel />

      <ElAlert
        v-if="!isSignedIn"
        title="Select a local role to enter the admin UI learning shell."
        type="warning"
        :closable="false"
        show-icon
      />

      <AdminLayout v-else>
        <template #sidebar>
          <AdminSidebar :active-id="activeId" @select="setActive" />
        </template>
        <template #topbar>
          <AdminTopbar />
        </template>
        <template #breadcrumb>
          <AdminBreadcrumb :current-label="currentLabel" />
        </template>
        <template #tabs>
          <AdminTabs v-model="activeId" :tabs="visibleTabs" />
        </template>

        <DashboardHome v-show="activeId === 'dashboard'" />
        <UserManagement v-show="activeId === 'users'" />
        <RoleManagement v-show="activeId === 'roles'" />
        <ProductManagement v-show="activeId === 'products'" />
        <OrderManagement v-show="activeId === 'orders'" />
        <UploadManagement v-show="activeId === 'upload'" />
      </AdminLayout>
    </div>
  </AdminConfigProvider>
</template>

<style scoped>
.dashboard-stack {
  display: grid;
  gap: 1rem;
}
</style>
