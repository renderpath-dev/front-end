<script setup lang="ts">
const ssrFlow = [
  "Create one app for the request",
  "Create one Pinia root for that app",
  "Create stores against that root",
  "Render and serialize the request state safely",
  "Discard request-scoped instances after the response",
] as const;
</script>

<template>
  <section class="panel">
    <p class="eyebrow">SSR boundary</p>
    <h2>Per-application state</h2>
    <ol>
      <li v-for="step in ssrFlow" :key="step">{{ step }}</li>
    </ol>
    <p>
      This workspace remains a browser SPA. The panel explains the boundary
      without adding an SSR runtime. A module-global reactive object can leak
      one request's state into another request.
    </p>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #fca5a5;
  border-radius: 1rem;
  background: #fef2f2;
}

.eyebrow {
  margin: 0;
  color: #b91c1c;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

li {
  margin-bottom: 0.4rem;
}
</style>
