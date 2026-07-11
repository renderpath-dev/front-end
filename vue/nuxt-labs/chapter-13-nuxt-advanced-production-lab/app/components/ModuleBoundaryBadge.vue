<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <span class="module-badge">{{ label }}</span>
</template>

<style scoped>
.module-badge {
  display: inline-flex;
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  color: #18794e;
  background: #e7efea;
  font-size: 0.78rem;
  font-weight: 900;
}
</style>
