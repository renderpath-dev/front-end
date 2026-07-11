<script setup lang="ts">
import NuxtAdvancedLabCommandPanel from "./components/NuxtAdvancedLabCommandPanel.vue";
import NuxtAuthSessionPanel from "./components/NuxtAuthSessionPanel.vue";
import NuxtContentBoundaryPanel from "./components/NuxtContentBoundaryPanel.vue";
import NuxtImageBoundaryPanel from "./components/NuxtImageBoundaryPanel.vue";
import NuxtLayerPanel from "./components/NuxtLayerPanel.vue";
import NuxtModuleSelectionPanel from "./components/NuxtModuleSelectionPanel.vue";
import NuxtTestingPanel from "./components/NuxtTestingPanel.vue";
import { nuxtProductionReadinessItems } from "./models/nuxtProductionReadinessModel";
</script>

<template>
  <section class="chapter-section" aria-labelledby="chapter-13-title">
    <header class="chapter-header">
      <p class="eyebrow">Chapter 13</p>
      <h2 id="chapter-13-title">
        Nuxt Advanced Modules, Content, Image, Auth Session, Layers, and
        Production Patterns
      </h2>
      <p>
        This Vite panel keeps the root learning shell intact. The advanced Nuxt
        module, content, image, session, layer, and test examples run in a
        separate Nuxt lab subproject.
      </p>
    </header>

    <div class="chapter-grid">
      <NuxtModuleSelectionPanel />
      <NuxtContentBoundaryPanel />
      <NuxtImageBoundaryPanel />
      <NuxtAuthSessionPanel />
      <NuxtLayerPanel />
      <NuxtTestingPanel />
    </div>

    <section class="chapter-card">
      <h3>Production readiness evidence</h3>
      <ul>
        <li v-for="item in nuxtProductionReadinessItems" :key="item.check">
          <strong>{{ item.check }}</strong>
          <span>{{ item.evidence }}</span>
        </li>
      </ul>
    </section>

    <NuxtAdvancedLabCommandPanel />
  </section>
</template>

<style scoped>
.chapter-section {
  display: grid;
  gap: 1rem;
}

.chapter-header,
.chapter-card {
  padding: 1.25rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 1rem 2.5rem rgba(33, 53, 71, 0.06);
}

.chapter-header h2 {
  max-width: 900px;
  margin: 0.35rem 0 0.75rem;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  line-height: 1.12;
}

.chapter-header p {
  max-width: 820px;
  line-height: 1.7;
}

.eyebrow {
  margin: 0;
  color: #18794e;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.chapter-card h3 {
  margin-top: 0;
}

.chapter-card ul {
  display: grid;
  gap: 0.75rem;
  padding-left: 1.2rem;
}

.chapter-card li {
  display: grid;
  gap: 0.2rem;
}
</style>
