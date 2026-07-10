<script setup lang="ts">
import { bundleAnalysisRecords } from "../performance/bundleAnalysisModel";
import { bundleBudgetRecords } from "../performance/bundleBudget";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Bundle analysis</p>
    <h3>Measure before changing imports</h3>
    <p>
      The visualizer report is a review artifact. It shows module and chunk
      contribution, but it does not prove user-perceived performance by itself.
    </p>
    <div class="badge-row">
      <span
        v-for="record in bundleAnalysisRecords"
        :key="record.signal"
        class="status-pill"
      >
        {{ record.signal }}
      </span>
    </div>
    <ul class="compact-list">
      <li v-for="record in bundleBudgetRecords" :key="record.dependency">
        <strong>{{ record.dependency }}</strong>
        <span>{{ record.reviewAction }}</span>
      </li>
    </ul>
  </section>
</template>
