<script setup lang="ts">
import { RouterView } from "vue-router";
import DynamicMenuPanel from "../components/DynamicMenuPanel.vue";
import GuardTracePanel from "../components/GuardTracePanel.vue";
import ParamsQueryPanel from "../components/ParamsQueryPanel.vue";
import RouteMetaPanel from "../components/RouteMetaPanel.vue";
import RouterLinkVsAnchor from "../components/RouterLinkVsAnchor.vue";
import RouterLabHomePanel from "./RouterLabHomePanel.vue";
import RouterLabScenarioPanel from "./RouterLabScenarioPanel.vue";
</script>

<template>
  <section class="router-lab" aria-labelledby="router-lab-title">
    <header>
      <p class="topic">Final integration</p>
      <h3 id="router-lab-title">Vue Admin Router Lab</h3>
      <p>
        The current URL passes through typed route records and guards.
        The top-level RouterView then renders either a public page or the
        nested admin layout.
      </p>
    </header>

    <div class="panel-grid">
      <RouterLabHomePanel />
      <RouterLabScenarioPanel />
      <RouterLinkVsAnchor />
      <ParamsQueryPanel />
      <RouteMetaPanel />
      <DynamicMenuPanel />
    </div>

    <GuardTracePanel />

    <section class="top-level-outlet">
      <p class="outlet-label">Top-level RouterView</p>
      <RouterView />
    </section>
  </section>
</template>

<style scoped>
.router-lab {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid #7ca1c8;
  border-radius: 1rem;
  background: #eef5fc;
}

.topic,
.outlet-label {
  margin: 0;
  color: #175cd3;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.5rem;
}

header p:last-child {
  margin-bottom: 0;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.8rem;
}

.top-level-outlet {
  display: grid;
  gap: 0.7rem;
  padding: 1rem;
  border: 1px dashed #6489b0;
  border-radius: 0.8rem;
  background: #ffffff;
}
</style>
