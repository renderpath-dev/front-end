<script setup lang="ts">
import ComponentTestReportPanel from "./ComponentTestReportPanel.vue";
import CoverageSummaryPanel from "./CoverageSummaryPanel.vue";
import E2eTestReportPanel from "./E2eTestReportPanel.vue";
import FailureMeaningPanel from "./FailureMeaningPanel.vue";
import IntegrationTestReportPanel from "./IntegrationTestReportPanel.vue";
import QualityCommandPanel from "./QualityCommandPanel.vue";
import UnitTestReportPanel from "./UnitTestReportPanel.vue";
</script>

<template>
  <section class="quality-lab" aria-labelledby="quality-lab-title">
    <header>
      <p>Runnable quality map</p>
      <h3 id="quality-lab-title">Vue Testing Quality Lab</h3>
    </header>
    <div class="report-grid">
      <UnitTestReportPanel />
      <ComponentTestReportPanel />
      <IntegrationTestReportPanel />
      <E2eTestReportPanel />
      <CoverageSummaryPanel />
    </div>
    <QualityCommandPanel />
    <FailureMeaningPanel />
  </section>
</template>

<style scoped>
.quality-lab {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid #b8d4c5;
  border-radius: 1rem;
  background: #ffffff;
}

.quality-lab header p {
  margin: 0;
  color: #18794e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quality-lab h3 {
  margin: 0.25rem 0 0;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.75rem;
}
</style>
