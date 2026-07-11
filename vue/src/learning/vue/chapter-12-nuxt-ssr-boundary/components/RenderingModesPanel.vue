<script setup lang="ts">
import { renderingModeCards } from "../models/renderingModeModel";
</script>

<template>
  <section class="panel">
    <h3>Rendering mode map</h3>
    <div class="mode-grid">
      <article v-for="mode in renderingModeCards" :key="mode.name">
        <h4>{{ mode.name }}</h4>
        <dl>
          <dt>Owner</dt>
          <dd>{{ mode.owner }}</dd>
          <dt>Trigger</dt>
          <dd>{{ mode.trigger }}</dd>
          <dt>Output</dt>
          <dd>{{ mode.output }}</dd>
          <dt>Fit</dt>
          <dd>{{ mode.projectFit }}</dd>
        </dl>
      </article>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

article {
  padding: 1rem;
  border-radius: 0.85rem;
  background: #f5f7f9;
}

h4 {
  margin: 0 0 0.75rem;
}

dl {
  display: grid;
  gap: 0.35rem;
  margin: 0;
}

dt {
  color: #18794e;
  font-weight: 800;
}

dd {
  margin: 0 0 0.35rem;
}
</style>
