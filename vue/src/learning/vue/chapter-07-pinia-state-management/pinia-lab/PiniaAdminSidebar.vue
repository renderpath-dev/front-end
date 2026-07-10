<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { routeRecords } from "../../chapter-06-vue-router-permission/router/routes";
import { generateDynamicMenu } from "../../chapter-06-vue-router-permission/router/dynamicMenu";
import { useSidebarStore } from "../stores/sidebarStore";

const sidebarStore = useSidebarStore();
const visibleMenuItems = computed(() => generateDynamicMenu(routeRecords));
</script>

<template>
  <aside
    class="sidebar"
    :class="{ collapsed: sidebarStore.collapsed }"
  >
    <div class="sidebar-actions">
      <button type="button" @click="sidebarStore.toggleCollapsed">
        {{ sidebarStore.collapsed ? "Expand" : "Collapse" }}
      </button>
      <button type="button" @click="sidebarStore.setPinned(!sidebarStore.pinned)">
        {{ sidebarStore.pinned ? "Unpin" : "Pin" }}
      </button>
    </div>
    <p>Route-derived menu</p>
    <nav aria-label="Pinia admin lab menu">
      <RouterLink
        v-for="item in visibleMenuItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
      >
        {{ sidebarStore.collapsed ? item.label.slice(0, 1) : item.label }}
      </RouterLink>
    </nav>
    <small>
      {{ sidebarStore.pinned ? "Pinned layout state" : "Flexible layout state" }}
    </small>
  </aside>
</template>

<style scoped>
.sidebar {
  display: grid;
  align-content: start;
  gap: 0.8rem;
  min-width: 220px;
  padding: 1rem;
  border-radius: 0.9rem;
  color: #e2e8f0;
  background: #1e293b;
  transition: min-width 160ms ease;
}

.sidebar.collapsed {
  min-width: 100px;
}

.sidebar-actions,
nav {
  display: grid;
  gap: 0.45rem;
}

a {
  padding: 0.45rem;
  border-radius: 0.4rem;
  color: #ccfbf1;
  text-decoration: none;
  background: rgba(15, 118, 110, 0.28);
}

button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #64748b;
  border-radius: 0.45rem;
  color: #f8fafc;
  background: transparent;
  cursor: pointer;
}
</style>
