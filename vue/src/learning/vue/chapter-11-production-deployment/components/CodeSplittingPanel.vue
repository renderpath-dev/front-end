<script setup lang="ts">
import { codeSplittingRecords } from "../performance/codeSplittingModel";
import { chapterSixLazyRoutes } from "../performance/routeLazyLoadingMap";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Code splitting</p>
    <h3>Dynamic imports create async chunk boundaries</h3>
    <p>
      Chapter 06 already uses route component loader functions. Chapter 11
      treats those loaders as production chunk and route-refresh evidence.
    </p>
    <ul class="compact-list">
      <li v-for="route in chapterSixLazyRoutes" :key="route.routeName">
        <strong>{{ route.routePath }}</strong>
        <span>{{ route.loaderOwner }}</span>
      </li>
    </ul>
    <p class="panel-note">Technique count: {{ codeSplittingRecords.length }}</p>
  </section>
</template>
