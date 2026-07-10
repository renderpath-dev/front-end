<script setup lang="ts">
import BuildArtifactPanel from "./BuildArtifactPanel.vue";
import BundleReportPanel from "./BundleReportPanel.vue";
import DeploymentTargetPanel from "./DeploymentTargetPanel.vue";
import DistMapPanel from "./DistMapPanel.vue";
import ProductionReadinessPanel from "./ProductionReadinessPanel.vue";
import RouteRefreshPanel from "./RouteRefreshPanel.vue";
import RuntimeConfigPanel from "./RuntimeConfigPanel.vue";
import StaticHostingPanel from "./StaticHostingPanel.vue";
</script>

<template>
  <section class="production-lab" aria-labelledby="production-lab-title">
    <header class="section-heading">
      <p class="eyebrow">Final project</p>
      <h2 id="production-lab-title">vue-production-deployment-lab</h2>
      <p>
        This lab composes build artifacts, env exposure, base path, assets,
        chunks, fallback, cache, deployment checklist, and rollback evidence
        without claiming commands have passed before they run.
      </p>
    </header>

    <div class="production-grid">
      <BuildArtifactPanel />
      <DistMapPanel />
      <RouteRefreshPanel />
      <BundleReportPanel />
      <RuntimeConfigPanel />
      <StaticHostingPanel />
      <DeploymentTargetPanel />
      <ProductionReadinessPanel />
    </div>
  </section>
</template>
