<script setup lang="ts">
import VueAdminDashboard from "./admin-dashboard/VueAdminDashboard.vue";
</script>

<template>
  <section class="chapter-section" aria-labelledby="chapter-08-title">
    <header class="chapter-hero">
      <p class="eyebrow">Vue Chapter 08</p>
      <h2 id="chapter-08-title">
        Admin UI, Forms, Tables, Upload, and Business Components
      </h2>
      <p>
        Build one contained admin dashboard with Element Plus, Router-owned
        table queries, cloned form drafts, local CRUD, browser File objects,
        Pinia-backed UI permissions, scoped theming, and Vue I18n.
      </p>
    </header>

    <VueAdminDashboard />
  </section>
</template>

<style scoped>
.chapter-section {
  display: grid;
  gap: 1rem;
}

.chapter-hero {
  padding: 2rem;
  border: 1px solid #bfdbfe;
  border-radius: 1rem;
  background:
    linear-gradient(135deg, rgba(239, 246, 255, 0.97), rgba(238, 242, 255, 0.97));
}

.eyebrow {
  margin: 0;
  color: #1d4ed8;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h2 {
  margin: 0.45rem 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
}

.chapter-hero p:last-child {
  max-width: 840px;
  line-height: 1.65;
}
</style>
