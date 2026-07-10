<script setup lang="ts">
import { webVitalBudgets } from "../performance/performanceBudget";
import { deploymentChecklist } from "../production/deploymentChecklist";
import { rollbackChecklist } from "../production/rollbackChecklist";

const requiredGateCount = deploymentChecklist.filter(
  (item) => item.requiredBeforeDeploy,
).length;
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Production readiness</p>
    <h3>Release readiness is evidence, not a label</h3>
    <dl class="definition-grid">
      <div>
        <dt>Required gates</dt>
        <dd>{{ requiredGateCount }}</dd>
      </div>
      <div>
        <dt>Web Vital targets</dt>
        <dd>{{ webVitalBudgets.length }}</dd>
      </div>
      <div>
        <dt>Rollback artifacts</dt>
        <dd>{{ rollbackChecklist.length }}</dd>
      </div>
    </dl>
  </section>
</template>
