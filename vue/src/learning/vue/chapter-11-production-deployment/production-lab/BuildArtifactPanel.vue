<script setup lang="ts">
import { productionBuildStages } from "../production/productionBuildModel";

const buildStage = productionBuildStages.find(
  (stage) => stage.id === "production-build",
);
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Build artifact</p>
    <h3>{{ buildStage?.label ?? "Production build" }}</h3>
    <p>{{ buildStage?.output ?? "UNKNOWN" }}</p>
    <p class="panel-note">
      Evidence source: {{ buildStage?.evidence ?? "missing-dist" }}
    </p>
  </section>
</template>
