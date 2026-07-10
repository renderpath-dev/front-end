<script setup lang="ts">
import { distOutputMap } from "../production/distOutputMap";
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Dist map</p>
    <h3>Expected dist artifacts</h3>
    <ul class="compact-list">
      <li v-for="artifact in distOutputMap" :key="artifact.kind">
        <strong>{{ artifact.expectedPath }}</strong>
        <span>{{ artifact.cacheOwner }}</span>
      </li>
    </ul>
  </section>
</template>
