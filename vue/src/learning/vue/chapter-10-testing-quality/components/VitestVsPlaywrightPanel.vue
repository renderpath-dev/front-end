<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Vitest gives fast feedback in a simulated DOM.",
  "Playwright verifies critical workflows in a real browser.",
  "The runners complement each other instead of duplicating every case.",
];
</script>

<template>
  <QualityConceptPanel
    title="Vitest and Playwright"
    boundary="Runner"
    :items="items"
  />
</template>
