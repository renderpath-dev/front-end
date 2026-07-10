<script setup lang="ts">
import AssetPipelinePanel from "./components/AssetPipelinePanel.vue";
import BasePathPanel from "./components/BasePathPanel.vue";
import BundleAnalysisPanel from "./components/BundleAnalysisPanel.vue";
import CdnCachePanel from "./components/CdnCachePanel.vue";
import CodeSplittingPanel from "./components/CodeSplittingPanel.vue";
import DeploymentChecklistPanel from "./components/DeploymentChecklistPanel.vue";
import DockerStaticDeployPanel from "./components/DockerStaticDeployPanel.vue";
import EnvModePanel from "./components/EnvModePanel.vue";
import LighthousePanel from "./components/LighthousePanel.vue";
import NginxFallbackPanel from "./components/NginxFallbackPanel.vue";
import PerformanceBudgetPanel from "./components/PerformanceBudgetPanel.vue";
import ProductionBuildPanel from "./components/ProductionBuildPanel.vue";
import ProductionErrorPanel from "./components/ProductionErrorPanel.vue";
import RollbackPanel from "./components/RollbackPanel.vue";
import VitePreviewPanel from "./components/VitePreviewPanel.vue";
import WebVitalsPanel from "./components/WebVitalsPanel.vue";
import VueProductionDeploymentLab from "./production-lab/VueProductionDeploymentLab.vue";
</script>

<template>
  <section class="production-chapter" aria-labelledby="chapter-11-title">
    <header class="section-heading">
      <p class="eyebrow">Chapter 11</p>
      <h2 id="chapter-11-title">
        Production Build, Performance Optimization, and Deployment
      </h2>
      <p>
        Move the tested Vue learning app from local development toward a
        production-ready static artifact with explicit build, cache, fallback,
        and rollback boundaries.
      </p>
    </header>

    <div class="production-grid">
      <ProductionBuildPanel />
      <VitePreviewPanel />
      <EnvModePanel />
      <BasePathPanel />
      <AssetPipelinePanel />
      <CodeSplittingPanel />
      <BundleAnalysisPanel />
      <PerformanceBudgetPanel />
      <WebVitalsPanel />
      <LighthousePanel />
      <NginxFallbackPanel />
      <DockerStaticDeployPanel />
      <CdnCachePanel />
      <DeploymentChecklistPanel />
      <RollbackPanel />
      <ProductionErrorPanel />
    </div>

    <VueProductionDeploymentLab />
  </section>
</template>

<style scoped>
.production-chapter,
.production-lab {
  display: grid;
  gap: 1.25rem;
}

.section-heading {
  padding: 2rem;
  border: 1px solid #d4dde8;
  border-radius: 1rem;
  background: linear-gradient(135deg, #ffffff, #eef6ff);
  box-shadow: 0 1rem 2.5rem rgba(33, 53, 71, 0.08);
}

.section-heading h2 {
  max-width: 900px;
  margin: 0.35rem 0 0.75rem;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.1;
}

.section-heading p {
  max-width: 860px;
  margin-bottom: 0;
  line-height: 1.7;
}

.eyebrow,
:global(.panel-kicker) {
  color: #1f6feb;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.production-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

:global(.production-card) {
  display: grid;
  align-content: start;
  gap: 0.85rem;
  min-height: 100%;
  padding: 1.2rem;
  border: 1px solid #d4dde8;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 0.75rem 2rem rgba(33, 53, 71, 0.07);
}

:global(.production-card h3) {
  margin: 0;
  font-size: 1.15rem;
}

:global(.production-card p) {
  margin: 0;
  line-height: 1.65;
}

:global(.timeline-list),
:global(.compact-list),
:global(.check-list) {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

:global(.timeline-list li),
:global(.compact-list li),
:global(.check-list li) {
  display: grid;
  gap: 0.25rem;
  padding: 0.75rem;
  border: 1px solid #e4ebf3;
  border-radius: 0.75rem;
  background: #f8fbff;
}

:global(.timeline-list span),
:global(.compact-list span),
:global(.check-list small),
:global(.compact-list small) {
  color: #536479;
  line-height: 1.45;
}

:global(.definition-grid),
:global(.metric-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;
}

:global(.definition-grid div),
:global(.metric-card) {
  padding: 0.75rem;
  border: 1px solid #e4ebf3;
  border-radius: 0.75rem;
  background: #f8fbff;
}

:global(.definition-grid dt) {
  color: #536479;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

:global(.definition-grid dd) {
  margin: 0.25rem 0 0;
  line-height: 1.45;
}

:global(.metric-card) {
  display: grid;
  gap: 0.25rem;
}

:global(.metric-card strong) {
  color: #0f5132;
  font-size: 1.15rem;
}

:global(.badge-row) {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

:global(.status-pill) {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: #e7f1ff;
  color: #1f6feb;
  font-size: 0.75rem;
  font-weight: 800;
}

:global(.panel-note) {
  padding: 0.75rem;
  border-left: 4px solid #1f6feb;
  border-radius: 0.5rem;
  background: #eef6ff;
  color: #30445f;
}

:global(.table-scroll) {
  overflow-x: auto;
}

:global(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

:global(th),
:global(td) {
  padding: 0.6rem;
  border-bottom: 1px solid #e4ebf3;
  text-align: left;
  vertical-align: top;
}

:global(th) {
  color: #30445f;
  font-size: 0.78rem;
  text-transform: uppercase;
}
</style>
