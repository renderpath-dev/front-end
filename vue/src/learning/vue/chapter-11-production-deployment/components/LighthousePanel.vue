<script setup lang="ts">
import { lighthouseAuditRecords } from "../performance/lighthouseAuditModel";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Lighthouse</p>
    <h3>Lab audits are useful but bounded</h3>
    <ul class="compact-list">
      <li v-for="audit in lighthouseAuditRecords" :key="audit.category">
        <strong>{{ audit.category }}</strong>
        <span>{{ audit.localEvidence }}</span>
        <small>{{ audit.limitation }}</small>
      </li>
    </ul>
  </section>
</template>
