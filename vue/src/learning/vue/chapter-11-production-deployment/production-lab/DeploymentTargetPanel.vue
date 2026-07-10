<script setup lang="ts">
import { deploymentTargets } from "../production/deploymentTargetModel";
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Deployment targets</p>
    <h3>Targets change serving owner, not the Vue bundle</h3>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Target</th>
            <th>Fallback owner</th>
            <th>Cache owner</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="target in deploymentTargets" :key="target.target">
            <td>{{ target.target }}</td>
            <td>{{ target.fallbackOwner }}</td>
            <td>{{ target.cacheOwner }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
