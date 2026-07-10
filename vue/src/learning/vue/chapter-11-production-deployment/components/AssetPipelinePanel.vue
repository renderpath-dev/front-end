<script setup lang="ts">
import { assetPipelineRecords } from "../production/assetPipelineModel";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Asset pipeline</p>
    <h3>Imported assets and public assets have different owners</h3>
    <ul class="compact-list">
      <li v-for="record in assetPipelineRecords" :key="record.owner">
        <strong>{{ record.owner }}</strong>
        <span>{{ record.buildBehavior }}</span>
        <small>{{ record.cacheBehavior }}</small>
      </li>
    </ul>
  </section>
</template>
