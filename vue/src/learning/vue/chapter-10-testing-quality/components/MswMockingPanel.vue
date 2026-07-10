<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Intercept requests at the network boundary.",
  "Keep success and failure scenarios explicit.",
  "Reject unhandled requests during tests.",
];
</script>

<template>
  <QualityConceptPanel
    title="MSW network mocking"
    boundary="HTTP boundary"
    :items="items"
  />
</template>
