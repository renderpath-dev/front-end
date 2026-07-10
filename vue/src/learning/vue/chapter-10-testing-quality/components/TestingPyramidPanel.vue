<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";
import { testLayers } from "../quality/testLayers";

const items = testLayers.map(
  (layer) => `${layer.name}: ${layer.scope} (${layer.speed})`,
);
</script>

<template>
  <QualityConceptPanel
    title="Testing pyramid"
    boundary="Strategy"
    :items="items"
  />
</template>
