<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";
import { ciCommandMap } from "../quality/ciCommandMap";

const items = [
  `Entry: ${ciCommandMap.localEntry}`,
  ...ciCommandMap.commands,
  ciCommandMap.stopPolicy,
];
</script>

<template>
  <QualityConceptPanel
    title="Local quality pipeline"
    boundary="Command orchestration"
    :items="items"
  />
</template>
