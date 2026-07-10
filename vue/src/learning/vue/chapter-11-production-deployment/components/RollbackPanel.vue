<script setup lang="ts">
import { rollbackChecklist } from "../production/rollbackChecklist";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Rollback</p>
    <h3>Rollback restores a complete artifact set</h3>
    <ul class="compact-list">
      <li v-for="item in rollbackChecklist" :key="item.artifact">
        <strong>{{ item.artifact }}</strong>
        <span>{{ item.action }}</span>
        <small>{{ item.risk }}</small>
      </li>
    </ul>
  </section>
</template>
