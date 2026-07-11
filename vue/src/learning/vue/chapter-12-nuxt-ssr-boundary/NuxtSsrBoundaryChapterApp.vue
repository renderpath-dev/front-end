<script setup lang="ts">
import HydrationBoundaryPanel from "./components/HydrationBoundaryPanel.vue";
import NuxtDataFetchingPanel from "./components/NuxtDataFetchingPanel.vue";
import NuxtDeploymentPanel from "./components/NuxtDeploymentPanel.vue";
import NuxtDirectoryPanel from "./components/NuxtDirectoryPanel.vue";
import NuxtLabCommandPanel from "./components/NuxtLabCommandPanel.vue";
import NuxtMentalModelPanel from "./components/NuxtMentalModelPanel.vue";
import NuxtRuntimeConfigPanel from "./components/NuxtRuntimeConfigPanel.vue";
import NuxtServerBoundaryPanel from "./components/NuxtServerBoundaryPanel.vue";
import RenderingModesPanel from "./components/RenderingModesPanel.vue";
import ViteSpaVsNuxtPanel from "./components/ViteSpaVsNuxtPanel.vue";
</script>

<template>
  <section class="chapter-section" aria-labelledby="chapter-12-title">
    <header class="chapter-hero">
      <p class="eyebrow">Chapter 12</p>
      <h2 id="chapter-12-title">
        Nuxt, SSR / SSG / Hybrid Rendering, and Full-stack Boundary
      </h2>
      <p>
        This chapter keeps the Vite learning shell visible while the runnable
        Nuxt practice app lives in its own subproject. The goal is to understand
        the server/client rendering boundary before adding modules, databases,
        auth providers, or deployment-specific files.
      </p>
    </header>

    <NuxtMentalModelPanel />
    <ViteSpaVsNuxtPanel />
    <RenderingModesPanel />
    <NuxtDirectoryPanel />
    <NuxtDataFetchingPanel />
    <NuxtServerBoundaryPanel />
    <NuxtRuntimeConfigPanel />
    <HydrationBoundaryPanel />
    <NuxtDeploymentPanel />
    <NuxtLabCommandPanel />
  </section>
</template>

<style scoped>
.chapter-section {
  display: grid;
  gap: 1rem;
}

.chapter-hero {
  padding: 2rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background:
    linear-gradient(135deg, rgba(16, 185, 129, 0.18), transparent 55%),
    #ffffff;
  box-shadow: 0 1rem 2.5rem rgba(33, 53, 71, 0.08);
}

.chapter-hero h2 {
  max-width: 860px;
  margin: 0.4rem 0 0.8rem;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.1;
}

.chapter-hero p {
  max-width: 860px;
  margin-bottom: 0;
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
</style>
