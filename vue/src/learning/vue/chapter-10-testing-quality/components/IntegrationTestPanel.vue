<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Use memory history for deterministic routing.",
  "Use a fresh store instance.",
  "Cross the network boundary through MSW.",
];
</script>

<template>
  <QualityConceptPanel
    title="Integration tests"
    boundary="Multiple boundaries"
    :items="items"
  />
</template>
