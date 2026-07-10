<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";
import { testFailureCatalog } from "../quality/testFailureCatalog";

const items = testFailureCatalog.map(
  (failure) => `${failure.signal}: ${failure.meaning}`,
);
</script>

<template>
  <QualityConceptPanel
    title="Failure diagnosis"
    boundary="Debugging"
    :items="items"
  />
</template>
