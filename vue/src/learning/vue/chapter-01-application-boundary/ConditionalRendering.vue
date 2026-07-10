<script setup lang="ts">
import { ref } from "vue";

type LearningStatus = "ready" | "learning" | "complete";

const status = ref<LearningStatus>("ready");
const showDetails = ref(true);

function setStatus(nextStatus: LearningStatus): void {
  status.value = nextStatus;
}
</script>

<template>
  <article class="practice-card">
    <p class="topic">Conditional rendering</p>
    <h2>Learning Status</h2>

    <p v-if="status === 'ready'" class="status">Ready to begin.</p>
    <p v-else-if="status === 'learning'" class="status">Learning in progress.</p>
    <p v-else class="status">Chapter complete.</p>

    <div class="actions">
      <button type="button" @click="setStatus('ready')">Ready</button>
      <button type="button" @click="setStatus('learning')">Learning</button>
      <button type="button" @click="setStatus('complete')">Complete</button>
    </div>

    <button
      type="button"
      class="details-toggle"
      @click="showDetails = !showDetails"
    >
      Toggle details
    </button>
    <p v-show="showDetails" class="details">
      This paragraph remains mounted while its display value changes.
    </p>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #dce6e1;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0 0.75rem;
}

.status {
  min-height: 1.5rem;
  font-weight: 700;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

button {
  padding: 0.55rem 0.7rem;
  border: 1px solid #bdd1c6;
  border-radius: 0.5rem;
  background: #f2f7f4;
  color: #1d4d38;
  cursor: pointer;
}

.details-toggle {
  margin-top: 0.8rem;
  border-color: #18794e;
  background: #18794e;
  color: #ffffff;
}

.details {
  margin-bottom: 0;
  color: #52636f;
}
</style>
