<script setup lang="ts">
import { chapterSixLazyRoutes } from "../performance/routeLazyLoadingMap";
</script>

<template>
  <section class="production-card lab-card">
    <p class="panel-kicker">Route refresh</p>
    <h3>History routes require fallback</h3>
    <p>
      Chapter 06 routes are lazy-loaded by Vue Router, but direct refresh is
      owned by the static server before Vue runs.
    </p>
    <div class="badge-row">
      <span
        v-for="route in chapterSixLazyRoutes"
        :key="route.routeName"
        class="status-pill"
      >
        {{ route.routePath }}
      </span>
    </div>
  </section>
</template>
