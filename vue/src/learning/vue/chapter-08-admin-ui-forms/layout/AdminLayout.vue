<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSidebarStore } from "../../chapter-07-pinia-state-management/stores/sidebarStore";

const sidebarStore = useSidebarStore();
const { collapsed } = storeToRefs(sidebarStore);
</script>

<template>
  <ElContainer class="admin-layout">
    <ElAside :width="collapsed ? '72px' : '220px'" class="admin-aside">
      <slot name="sidebar" />
    </ElAside>
    <ElContainer>
      <ElHeader class="admin-header">
        <slot name="topbar" />
      </ElHeader>
      <div class="admin-context">
        <slot name="breadcrumb" />
        <slot name="tabs" />
      </div>
      <ElMain class="admin-main">
        <slot />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.admin-layout {
  min-height: 760px;
  overflow: hidden;
  border: 1px solid var(--admin-border);
  border-radius: 0.85rem;
  background: var(--admin-background);
}

.admin-aside {
  transition: width 180ms ease;
  background: #172033;
}

.admin-header {
  height: auto;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--admin-border);
  background: var(--admin-surface);
}

.admin-context {
  display: grid;
  gap: 0.5rem;
  padding: 0.75rem 1rem 0;
  background: var(--admin-background);
}

.admin-main {
  background: var(--admin-background);
}

@media (max-width: 720px) {
  .admin-aside {
    width: 72px !important;
  }
}
</style>
