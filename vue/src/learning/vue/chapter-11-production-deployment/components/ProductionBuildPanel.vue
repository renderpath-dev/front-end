<script setup lang="ts">
import { productionBuildStages } from "../production/productionBuildModel";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Production build model</p>
    <h3>Source to deployed runtime</h3>
    <p>
      The production path is a sequence of evidence-producing gates, not a
      single successful dev server page.
    </p>
    <ol class="timeline-list">
      <li v-for="stage in productionBuildStages" :key="stage.id">
        <strong>{{ stage.label }}</strong>
        <span>{{ stage.command }}</span>
        <small>{{ stage.evidence }}</small>
      </li>
    </ol>
  </section>
</template>
