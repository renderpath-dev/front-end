<script setup lang="ts">
import { distOutputMap } from "../production/distOutputMap";
</script>

<template>
  <section class="production-card">
    <p class="panel-kicker">Vite preview</p>
    <h3>Preview serves built files</h3>
    <p>
      Preview starts from an existing dist directory. It is useful local
      evidence, but it is still not the real static host, Nginx server, or CDN.
    </p>
    <ul class="compact-list">
      <li v-for="artifact in distOutputMap.slice(0, 3)" :key="artifact.kind">
        <strong>{{ artifact.expectedPath }}</strong>
        <span>{{ artifact.verification }}</span>
      </li>
    </ul>
  </section>
</template>
