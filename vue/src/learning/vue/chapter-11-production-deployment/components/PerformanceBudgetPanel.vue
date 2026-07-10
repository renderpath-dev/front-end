<script setup lang="ts">
import { sizeBudgets, webVitalBudgets } from "../performance/performanceBudget";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Performance budget</p>
    <h3>Learning budgets create review signals</h3>
    <p>
      These thresholds are local learning targets, not universal production
      truth. A failure means the bundle and user path need investigation.
    </p>
    <div class="metric-grid">
      <div v-for="budget in sizeBudgets" :key="budget.name" class="metric-card">
        <strong>{{ budget.limit }} {{ budget.unit }}</strong>
        <span>{{ budget.name }}</span>
      </div>
      <div
        v-for="budget in webVitalBudgets"
        :key="budget.name"
        class="metric-card"
      >
        <strong>{{ budget.target }} {{ budget.unit }}</strong>
        <span>{{ budget.name }}</span>
      </div>
    </div>
  </section>
</template>
