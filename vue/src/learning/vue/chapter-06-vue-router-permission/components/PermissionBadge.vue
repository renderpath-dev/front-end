<script setup lang="ts">
defineProps<{
  label: string;
  granted: boolean;
}>();
</script>

<template>
  <span
    class="permission-badge"
    :class="{ granted }"
  >
    {{ label }}: {{ granted ? "allowed" : "denied" }}
  </span>
</template>

<style scoped>
.permission-badge {
  display: inline-flex;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: #fee4e2;
  color: #b42318;
  font-size: 0.8rem;
  font-weight: 700;
}

.permission-badge.granted {
  background: #d1fadf;
  color: #05603a;
}
</style>
