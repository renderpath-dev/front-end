<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Treat props, emits, and slots as the public contract.",
  "Trigger interaction through the rendered DOM.",
  "Do not assert private component state.",
];
</script>

<template>
  <QualityConceptPanel
    title="Component tests"
    boundary="Public interface"
    :items="items"
  />
</template>
