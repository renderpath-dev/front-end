<script setup lang="ts">
interface NuxtErrorShape {
  readonly statusCode?: number;
  readonly statusMessage?: string;
  readonly message?: string;
}

defineProps<{
  readonly error: NuxtErrorShape;
}>();

function returnHome(): Promise<void> {
  return clearError({ redirect: "/" });
}
</script>

<template>
  <main class="error-page">
    <p class="eyebrow">Nuxt error boundary</p>
    <h1>{{ error.statusCode ?? 500 }}</h1>
    <p>{{ error.statusMessage ?? error.message ?? "Unexpected error" }}</p>
    <button type="button" @click="returnHome">Return home</button>
  </main>
</template>

<style scoped>
.error-page {
  display: grid;
  gap: 1rem;
  max-width: 48rem;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
  color: #213547;
}

.eyebrow {
  margin: 0;
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

button {
  width: fit-content;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.7rem;
  background: #18794e;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
}
</style>
