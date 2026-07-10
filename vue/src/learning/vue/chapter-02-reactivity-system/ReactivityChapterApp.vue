<script setup lang="ts">
import ComputedVsMethod from "./ComputedVsMethod.vue";
import NextTickDom from "./NextTickDom.vue";
import ProxyTrackTriggerMentalModel from "./ProxyTrackTriggerMentalModel.vue";
import ReactiveDestructureMistake from "./ReactiveDestructureMistake.vue";
import ReadonlyUnrefDemo from "./ReadonlyUnrefDemo.vue";
import RefVsReactive from "./RefVsReactive.vue";
import ShallowRefDemo from "./ShallowRefDemo.vue";
import ToRefToRefsDemo from "./ToRefToRefsDemo.vue";
import VueReactivityLab from "./VueReactivityLab.vue";
import WatchBasic from "./WatchBasic.vue";
import WatchEffectDemo from "./WatchEffectDemo.vue";
</script>

<template>
  <section class="chapter" aria-labelledby="chapter-02-title">
    <header class="chapter-header">
      <p class="eyebrow">Chapter 02</p>
      <h2 id="chapter-02-title">Reactivity System and Update Mechanism</h2>
      <p>
        Trace reactive reads, dependency ownership, write triggers, scheduled
        component updates, and DOM patch timing through focused local demos.
      </p>
    </header>

    <div class="demo-grid">
      <RefVsReactive />
      <ComputedVsMethod />
      <WatchBasic />
      <WatchEffectDemo />
      <NextTickDom />
      <ReactiveDestructureMistake />
      <ShallowRefDemo />
      <ToRefToRefsDemo />
      <ReadonlyUnrefDemo />
      <ProxyTrackTriggerMentalModel />
    </div>

    <VueReactivityLab />
  </section>
</template>

<style scoped>
.chapter {
  display: grid;
  gap: 1rem;
}

.chapter-header {
  padding: 1.5rem;
  border: 1px solid #c9ddd3;
  border-radius: 1rem;
  background: #eef8f3;
}

.chapter-header h2 {
  margin: 0.35rem 0 0.6rem;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
}

.chapter-header p:last-child {
  max-width: 780px;
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

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1rem;
}

@media (max-width: 500px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
