<script setup lang="ts">
import RouterConceptPanel from "./components/RouterConceptPanel.vue";
import VueAdminRouterLab from "./router-lab/VueAdminRouterLab.vue";
</script>

<template>
  <section
    class="router-chapter"
    aria-labelledby="chapter-06-title"
  >
    <header class="chapter-header">
      <p class="eyebrow">Chapter 06 · Vue Router</p>
      <h2 id="chapter-06-title">
        URL State, Navigation Guards, and Permission Routing
      </h2>
      <p>
        Trace how browser URLs match records, pass through guards, select
        RouterView components, and produce role-aware navigation.
      </p>
    </header>

    <RouterConceptPanel />
    <VueAdminRouterLab />
  </section>
</template>

<style scoped>
.router-chapter {
  display: grid;
  gap: 1rem;
}

.chapter-header {
  padding: 1.4rem;
  border: 1px solid #b8cbe0;
  border-radius: 1rem;
  background: #f7fbff;
}

.eyebrow {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h2 {
  margin: 0.4rem 0 0.65rem;
}

.chapter-header p:last-child {
  margin-bottom: 0;
}
</style>
