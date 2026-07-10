<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";
import { coveragePolicy } from "../quality/coveragePolicy";

const items = [
  coveragePolicy.purpose,
  ...coveragePolicy.preferredTargets,
  `Avoid: ${coveragePolicy.rejectedShortcut}`,
];
</script>

<template>
  <QualityConceptPanel
    title="Coverage policy"
    boundary="Evidence"
    :items="items"
  />
</template>
