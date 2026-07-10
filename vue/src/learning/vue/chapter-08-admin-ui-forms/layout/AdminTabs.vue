<script setup lang="ts">
import type { AdminTab } from "../contracts/adminUiTypes";

const activeId = defineModel<AdminTab["id"]>({ required: true });

defineProps<{
  tabs: ReadonlyArray<AdminTab>;
}>();
</script>

<template>
  <ElTabs v-model="activeId" class="admin-tabs">
    <ElTabPane
      v-for="tab in tabs"
      :key="tab.id"
      :label="tab.label"
      :name="tab.id"
      :closable="tab.closable"
    />
  </ElTabs>
</template>

<style scoped>
.admin-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
}

.admin-tabs :deep(.el-tabs__content) {
  display: none;
}
</style>
