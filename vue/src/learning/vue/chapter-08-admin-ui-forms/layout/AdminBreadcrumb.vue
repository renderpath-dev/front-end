<script setup lang="ts">
defineProps<{
  currentLabel: string;
}>();
</script>

<template>
  <ElBreadcrumb separator="/">
    <ElBreadcrumbItem>Admin UI</ElBreadcrumbItem>
    <ElBreadcrumbItem>{{ currentLabel }}</ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
