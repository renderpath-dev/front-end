<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Call reactivity-only composables directly.",
  "Use a host component for lifecycle or injection dependencies.",
  "Assert returned state and public actions.",
];
</script>

<template>
  <QualityConceptPanel
    title="Composable tests"
    boundary="Unit"
    :items="items"
  />
</template>
