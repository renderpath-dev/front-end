<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import { useSidebarStore } from "../../chapter-07-pinia-state-management/stores/sidebarStore";
import type {
  AdminMenuItem,
  AdminTab,
} from "../contracts/adminUiTypes";

const props = defineProps<{
  activeId: AdminTab["id"];
}>();

const emit = defineEmits<{
  select: [id: AdminTab["id"]];
}>();

const sidebarStore = useSidebarStore();
const permissionStore = usePermissionStore();
const { collapsed } = storeToRefs(sidebarStore);

const menuItems: ReadonlyArray<AdminMenuItem> = [
  {
    id: "dashboard",
    label: "Dashboard",
    requiredRoles: ["admin", "manager", "operator"],
  },
  {
    id: "users",
    label: "Users",
    requiredRoles: ["admin", "manager"],
  },
  {
    id: "roles",
    label: "Roles",
    requiredRoles: ["admin"],
  },
  {
    id: "products",
    label: "Products",
    requiredRoles: ["admin", "manager"],
  },
  {
    id: "orders",
    label: "Orders",
    requiredRoles: ["admin", "manager", "operator"],
  },
  {
    id: "upload",
    label: "Upload",
    requiredRoles: ["admin", "manager"],
  },
];

const visibleItems = computed(() =>
  menuItems.filter((item) =>
    permissionStore.hasRole(item.requiredRoles),
  ),
);

function select(index: string): void {
  const item = visibleItems.value.find((candidate) => candidate.id === index);
  if (item) {
    emit("select", item.id);
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="brand">{{ collapsed ? "AU" : "Admin UI" }}</div>
    <ElMenu
      :collapse="collapsed"
      :default-active="props.activeId"
      background-color="#172033"
      text-color="#cbd5e1"
      active-text-color="#ffffff"
      @select="select"
    >
      <ElMenuItem
        v-for="item in visibleItems"
        :key="item.id"
        :index="item.id"
      >
        <span>{{ collapsed ? item.label.slice(0, 1) : item.label }}</span>
      </ElMenuItem>
    </ElMenu>
  </div>
</template>

<style scoped>
.sidebar {
  min-height: 100%;
}

.brand {
  padding: 1.1rem;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.04em;
}

:deep(.el-menu) {
  border-right: 0;
}
</style>
