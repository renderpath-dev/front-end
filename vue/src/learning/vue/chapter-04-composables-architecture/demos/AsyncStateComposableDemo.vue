<script setup lang="ts">
import { ref } from "vue";
import { useAsyncState } from "../composables/useAsyncState";

type RequestMode = "success" | "error" | "slow";

const requestMode = ref<RequestMode>("success");
let executionCount = 0;

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

async function loadLocalResult(): Promise<string> {
  executionCount += 1;
  const currentExecution = executionCount;
  const currentMode = requestMode.value;
  await wait(currentMode === "slow" ? 900 : 250);

  if (currentMode === "error") {
    throw new Error(`Local operation ${currentExecution} failed.`);
  }

  return `Local result ${currentExecution} (${currentMode})`;
}

const {
  data,
  error,
  status,
  loading,
  execute,
  reset,
} = useAsyncState(loadLocalResult);

function executeMode(mode: RequestMode): Promise<string | null> {
  requestMode.value = mode;
  return execute();
}

function demonstrateStaleResultProtection(): void {
  void executeMode("slow");
  void executeMode("success");
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">Promise lifecycle</p>
    <h3>Async State and Stale Results</h3>
    <p>Status: {{ status }} · Loading: {{ loading }}</p>
    <p v-if="data">Data: {{ data }}</p>
    <p v-if="error" class="error">Error: {{ error.message }}</p>
    <div class="actions">
      <button type="button" @click="executeMode('success')">
        Load success
      </button>
      <button type="button" @click="executeMode('error')">
        Load error
      </button>
      <button type="button" @click="demonstrateStaleResultProtection">
        Slow then fast
      </button>
      <button type="button" @click="reset">Reset</button>
    </div>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #cadbe0;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #267083;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.75rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #6c9ba6;
  border-radius: 0.4rem;
  background: #eff9fb;
  cursor: pointer;
}

.error {
  color: #b42318;
}
</style>
