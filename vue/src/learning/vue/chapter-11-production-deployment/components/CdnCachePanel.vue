<script setup lang="ts">
import { cachePolicyRecords } from "../production/cachePolicyModel";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">CDN and browser cache</p>
    <h3>Index and hashed assets need different cache policies</h3>
    <ul class="compact-list">
      <li v-for="record in cachePolicyRecords" :key="record.target">
        <strong>{{ record.target }}</strong>
        <span>{{ record.recommendedHeader }}</span>
        <small>{{ record.rollbackRisk }}</small>
      </li>
    </ul>
  </section>
</template>
