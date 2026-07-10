<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Format and lint only staged files.",
  "Keep slow browser tests out of the hook.",
  "Activate hooks only after Git metadata exists.",
];
</script>

<template>
  <QualityConceptPanel
    title="Pre-commit boundary"
    boundary="Local workflow"
    :items="items"
  />
</template>
