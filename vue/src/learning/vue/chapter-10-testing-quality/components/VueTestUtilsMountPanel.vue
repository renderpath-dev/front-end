<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Mount the real component with required plugins.",
  "Interact through rendered controls.",
  "Assert props, DOM output, slots, and emitted events.",
];
</script>

<template>
  <QualityConceptPanel
    title="Vue Test Utils mount"
    boundary="Component harness"
    :items="items"
  />
</template>
