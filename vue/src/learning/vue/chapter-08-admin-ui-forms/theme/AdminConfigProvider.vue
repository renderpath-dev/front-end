<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThemeStore } from "../../chapter-07-pinia-state-management/stores/themeStore";
import { elementPlusLocale } from "../ui/elementPlusLocale";

const themeStore = useThemeStore();
const { themeClass } = storeToRefs(themeStore);
</script>

<template>
  <ElConfigProvider :locale="elementPlusLocale">
    <div class="admin-scope" :class="themeClass">
      <slot />
    </div>
  </ElConfigProvider>
</template>

<style scoped>
.admin-scope {
  --admin-background: #f4f7fb;
  --admin-surface: #ffffff;
  --admin-surface-muted: #f7f8fa;
  --admin-border: #d9e1ea;
  --admin-text: #1f2937;
  --el-color-primary: #2563eb;
  color: var(--admin-text);
  color-scheme: light;
}

.admin-scope.theme-dark {
  --admin-background: #111827;
  --admin-surface: #1f2937;
  --admin-surface-muted: #273244;
  --admin-border: #46556b;
  --admin-text: #f3f4f6;
  --el-bg-color: #1f2937;
  --el-bg-color-overlay: #273244;
  --el-fill-color-blank: #1f2937;
  --el-text-color-primary: #f3f4f6;
  --el-text-color-regular: #d1d5db;
  --el-border-color: #46556b;
  color-scheme: dark;
}

.admin-scope.accent-emerald {
  --el-color-primary: #059669;
}

.admin-scope.accent-indigo {
  --el-color-primary: #4f46e5;
}

.admin-scope.accent-amber {
  --el-color-primary: #d97706;
}
</style>
