<script setup lang="ts">
import QualityConceptPanel from "./QualityConceptPanel.vue";

const items = [
  "Cover login, permission, form submission, and CRUD flows.",
  "Locate controls by accessible role and name.",
  "Keep the suite focused on high-value workflows.",
];
</script>

<template>
  <QualityConceptPanel
    title="End-to-end flows"
    boundary="Real browser"
    :items="items"
  />
</template>
