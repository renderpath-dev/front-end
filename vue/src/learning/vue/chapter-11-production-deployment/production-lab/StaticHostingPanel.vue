<script setup lang="ts">
import { deploymentTargets } from "../production/deploymentTargetModel";

const staticTargets = deploymentTargets.filter((target) =>
  target.target.includes("static"),
);
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Static hosting</p>
    <h3>Upload dist, not source</h3>
    <ul class="compact-list">
      <li v-for="target in staticTargets" :key="target.target">
        <strong>{{ target.target }}</strong>
        <span>{{ target.fallbackOwner }}</span>
      </li>
    </ul>
  </section>
</template>
