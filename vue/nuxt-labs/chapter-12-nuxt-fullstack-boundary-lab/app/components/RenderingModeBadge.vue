<script setup lang="ts">
import {
  getRouteModeLabel,
  type RouteModeName,
} from "../utils/routeModeLabel";

const props = defineProps<{
  readonly mode: RouteModeName;
}>();

const modeLabel = computed(() => getRouteModeLabel(props.mode));
</script>

<template>
  <section class="mode-badge">
    <strong>{{ modeLabel.label }}</strong>
    <span>{{ modeLabel.description }}</span>
  </section>
</template>

<style scoped>
.mode-badge {
  display: inline-grid;
  gap: 0.35rem;
  max-width: 36rem;
  padding: 0.75rem 1rem;
  border-radius: 0.8rem;
  background: #e7f8ef;
  color: #102019;
}

strong {
  color: #18794e;
}
</style>
