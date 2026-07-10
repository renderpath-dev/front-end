<script setup lang="ts">
import {
  clearNavigationTrace,
  navigationTrace,
} from "../router/navigationTrace";
</script>

<template>
  <section class="trace-panel" aria-labelledby="trace-title">
    <div class="trace-heading">
      <h3 id="trace-title">Guard pipeline trace</h3>
      <button type="button" @click="clearNavigationTrace">
        Clear trace
      </button>
    </div>
    <ol v-if="navigationTrace.length > 0">
      <li v-for="entry in navigationTrace" :key="entry.id">
        <strong>{{ entry.phase }}</strong>
        <span>{{ entry.from }} → {{ entry.to }}</span>
        <span>{{ entry.outcome }}</span>
      </li>
    </ol>
    <p v-else>Navigate to record beforeEach, beforeResolve, and afterEach.</p>
  </section>
</template>

<style scoped>
.trace-panel {
  padding: 1rem;
  border: 1px solid #c4d4e3;
  border-radius: 0.75rem;
  background: #f8fbff;
}

.trace-heading {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

h3 {
  margin: 0;
}

button {
  padding: 0.35rem 0.55rem;
  border: 1px solid #84a4c5;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

ol {
  display: grid;
  gap: 0.55rem;
  padding-left: 1.25rem;
}

li {
  display: grid;
  gap: 0.15rem;
}
</style>
