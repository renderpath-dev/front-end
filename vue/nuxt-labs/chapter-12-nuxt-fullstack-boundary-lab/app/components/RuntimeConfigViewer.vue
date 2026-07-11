<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <section class="config-card">
    <h3>Public runtime config</h3>
    <dl>
      <dt>apiBase</dt>
      <dd>{{ config.public.apiBase }}</dd>
      <dt>appTitle</dt>
      <dd>{{ config.public.appTitle }}</dd>
    </dl>
  </section>
</template>

<style scoped>
.config-card {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

dl {
  display: grid;
  gap: 0.4rem;
  margin: 0;
}

dt {
  color: #18794e;
  font-weight: 800;
}

dd {
  margin: 0 0 0.5rem;
}
</style>
