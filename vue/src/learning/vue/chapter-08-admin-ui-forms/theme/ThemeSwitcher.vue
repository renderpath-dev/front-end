<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeStore } from "../../chapter-07-pinia-state-management/stores/themeStore";

const themeStore = useThemeStore();
const { accent, mode } = storeToRefs(themeStore);
</script>

<template>
  <div class="theme-control">
    <ElSelect
      v-model="mode"
      aria-label="Theme mode"
      class="compact-control"
      @change="themeStore.setMode(mode)"
    >
      <ElOption label="Light" value="light" />
      <ElOption label="Dark" value="dark" />
      <ElOption label="System" value="system" />
    </ElSelect>
    <ElTag type="info">{{ accent }}</ElTag>
  </div>
</template>

<style scoped>
.theme-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.compact-control {
  width: 112px;
}
</style>
