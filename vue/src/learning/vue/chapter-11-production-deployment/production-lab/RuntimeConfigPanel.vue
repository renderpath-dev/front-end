<script setup lang="ts">
import { runtimeConfigBoundaries } from "../production/runtimeConfigBoundary";
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Runtime config</p>
    <h3>Static bundles cannot protect secrets</h3>
    <ul class="compact-list">
      <li v-for="record in runtimeConfigBoundaries" :key="record.pattern">
        <strong>{{ record.pattern }}</strong>
        <span>{{ record.note }}</span>
        <small>Secret safe: {{ record.secretSafe }}</small>
      </li>
    </ul>
  </section>
</template>
