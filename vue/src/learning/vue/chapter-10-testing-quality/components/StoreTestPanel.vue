<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Create a fresh Pinia instance for each test.",
  "Exercise public actions and getters.",
  "Avoid sharing state across test cases.",
];
</script>

<template>
  <QualityConceptPanel title="Store tests" boundary="Unit" :items="items" />
</template>
