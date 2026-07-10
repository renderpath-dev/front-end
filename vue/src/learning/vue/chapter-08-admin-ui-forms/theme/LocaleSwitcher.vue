<script setup lang="ts">
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  adminLocale,
  setAdminLocale,
  type AdminLocale,
} from "../ui/elementPlusLocale";

const { locale } = useI18n({ useScope: "global" });

watch(
  adminLocale,
  (value) => {
    locale.value = value;
  },
  { immediate: true },
);

function changeLocale(value: AdminLocale): void {
  setAdminLocale(value);
}
</script>

<template>
  <ElSelect
    :model-value="adminLocale"
    aria-label="Interface locale"
    class="compact-control"
    @update:model-value="changeLocale"
  >
    <ElOption label="English" value="en" />
    <ElOption label="Chinese locale" value="zhCn" />
  </ElSelect>
</template>

<style scoped>
.compact-control {
  width: 144px;
}
</style>
