<script setup lang="ts">
import { deploymentChecklist } from "../production/deploymentChecklist";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Deployment checklist</p>
    <h3>Every release gate needs evidence</h3>
    <ul class="check-list">
      <li v-for="item in deploymentChecklist" :key="item.id">
        <span class="status-pill">{{ item.status }}</span>
        <strong>{{ item.label }}</strong>
        <small>{{ item.commandOrEvidence }}</small>
      </li>
    </ul>
  </section>
</template>
