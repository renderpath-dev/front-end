<script setup lang="ts">
import { webVitalRecords } from "../performance/webVitalsModel";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Web Vitals</p>
    <h3>LCP, INP, and CLS are user-experience signals</h3>
    <ul class="compact-list">
      <li v-for="metric in webVitalRecords" :key="metric.name">
        <strong>{{ metric.name }}: {{ metric.fullName }}</strong>
        <span>{{ metric.measures }}</span>
        <small>Good threshold: {{ metric.goodThreshold }}</small>
      </li>
    </ul>
  </section>
</template>
