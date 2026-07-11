<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

async function goHome() {
  await clearError({ redirect: "/" });
}
</script>

<template>
  <main class="error-page">
    <p class="eyebrow">Controlled error boundary</p>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <button type="button" @click="goHome">Return home</button>
  </main>
</template>

<style scoped>
.error-page {
  width: min(720px, calc(100% - 2rem));
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.eyebrow {
  color: #18794e;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

button {
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  color: #ffffff;
  background: #18794e;
}
</style>
