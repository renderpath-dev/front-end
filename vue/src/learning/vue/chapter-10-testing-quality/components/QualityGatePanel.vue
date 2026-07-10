<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";
import { qualityGateChecklist } from "../quality/qualityGateChecklist";

const items = qualityGateChecklist.map(
  (gate) => `${gate.command}: ${gate.protects}`,
);
</script>

<template>
  <QualityConceptPanel
    title="Quality gates"
    boundary="Automation"
    :items="items"
  />
</template>
