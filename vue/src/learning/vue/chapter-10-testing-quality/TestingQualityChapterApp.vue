<script setup lang="ts">
import CiPipelinePanel from "./components/CiPipelinePanel.vue";
import ComponentTestPanel from "./components/ComponentTestPanel.vue";
import ComposableTestPanel from "./components/ComposableTestPanel.vue";
import CoveragePanel from "./components/CoveragePanel.vue";
import E2eFlowPanel from "./components/E2eFlowPanel.vue";
import FailureDiagnosisPanel from "./components/FailureDiagnosisPanel.vue";
import IntegrationTestPanel from "./components/IntegrationTestPanel.vue";
import MswMockingPanel from "./components/MswMockingPanel.vue";
import PreCommitPanel from "./components/PreCommitPanel.vue";
import QualityGatePanel from "./components/QualityGatePanel.vue";
import StoreTestPanel from "./components/StoreTestPanel.vue";
import TestingPyramidPanel from "./components/TestingPyramidPanel.vue";
import VitestVsPlaywrightPanel from "./components/VitestVsPlaywrightPanel.vue";
import VueTestUtilsMountPanel from "./components/VueTestUtilsMountPanel.vue";
import VueTestingQualityLab from "./testing-quality-lab/VueTestingQualityLab.vue";
</script>

<template>
  <section class="testing-quality-chapter" aria-labelledby="chapter-10-title">
    <header class="chapter-hero">
      <p>Chapter 10</p>
      <h2 id="chapter-10-title">
        Testing, Quality Gates, and Engineering Automation
      </h2>
      <span>
        Turn behavior contracts into fast feedback, browser confidence, and a
        repeatable local quality pipeline.
      </span>
    </header>

    <div class="concept-grid" aria-label="Testing and quality concepts">
      <TestingPyramidPanel />
      <VitestVsPlaywrightPanel />
      <VueTestUtilsMountPanel />
      <ComposableTestPanel />
      <StoreTestPanel />
      <ComponentTestPanel />
      <IntegrationTestPanel />
      <MswMockingPanel />
      <E2eFlowPanel />
      <CoveragePanel />
      <QualityGatePanel />
      <PreCommitPanel />
      <CiPipelinePanel />
      <FailureDiagnosisPanel />
    </div>

    <VueTestingQualityLab />
  </section>
</template>

<style scoped>
.testing-quality-chapter {
  display: grid;
  gap: 1.25rem;
}

.chapter-hero {
  padding: 2rem;
  border: 1px solid #b8d4c5;
  border-radius: 1rem;
  background:
    linear-gradient(135deg, rgba(66, 184, 131, 0.16), transparent 55%), #ffffff;
}

.chapter-hero p {
  margin: 0;
  color: #18794e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.chapter-hero h2 {
  max-width: 820px;
  margin: 0.35rem 0 0.7rem;
  font-size: clamp(1.7rem, 4vw, 2.8rem);
}

.chapter-hero span {
  display: block;
  max-width: 760px;
  color: #40534a;
  line-height: 1.7;
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
  gap: 0.85rem;
}
</style>
