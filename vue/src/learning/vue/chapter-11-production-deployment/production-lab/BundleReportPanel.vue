<script setup lang="ts">
import { bundleAnalysisRecords } from "../performance/bundleAnalysisModel";
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Bundle report</p>
    <h3>Analyzer status</h3>
    <p>
      Run build:analyze to create dist/stats.html. Until that command runs, the
      report status remains UNKNOWN.
    </p>
    <p class="panel-note">Current report status: UNKNOWN</p>
    <div class="badge-row">
      <span
        v-for="record in bundleAnalysisRecords"
        :key="record.signal"
        class="status-pill"
      >
        {{ record.signal }}
      </span>
    </div>
  </section>
</template>
