<script setup lang="ts">
import { ref } from "vue";

type CounterState = {
  count: number;
};

const operationLog = ref<string[]>([]);
const displayedCount = ref(0);
const rawState: CounterState = {
  count: 0,
};

const trackedState = new Proxy(rawState, {
  get(target, key, receiver) {
    const value = Reflect.get(target, key, receiver);
    operationLog.value.push(`get/${String(key)} -> ${String(value)}`);
    return value;
  },
  set(target, key, value, receiver) {
    const didSet = Reflect.set(target, key, value, receiver);
    operationLog.value.push(`set/${String(key)} -> ${String(value)}`);
    return didSet;
  },
});

function readCount(): void {
  displayedCount.value = trackedState.count;
}

function writeCount(): void {
  trackedState.count += 1;
  displayedCount.value = trackedState.count;
}

function clearLog(): void {
  operationLog.value = [];
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">Simplified Proxy mental model</p>
    <h3>Read tracking and write triggering vocabulary</h3>

    <p class="count">Displayed count: {{ displayedCount }}</p>
    <div class="actions">
      <button type="button" @click="readCount">Read count</button>
      <button type="button" @click="writeCount">Write count</button>
      <button type="button" @click="clearLog">Clear log</button>
    </div>

    <ol>
      <li v-for="(entry, index) in operationLog" :key="`${index}-${entry}`">
        {{ entry }}
      </li>
    </ol>

    <p class="note">
      This uses a native JavaScript Proxy and Reflect only to illustrate
      interception. The log is not Vue source code and omits dependency maps,
      active effects, scheduling, batching, and DOM patching.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #c6d3df;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #325f87;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

.count {
  font-size: 1.1rem;
  font-weight: 800;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #94aec5;
  border-radius: 0.5rem;
  background: #eef5fb;
  color: #294f70;
  cursor: pointer;
}

ol {
  min-height: 3rem;
  max-height: 12rem;
  overflow: auto;
  padding: 0.75rem 0.75rem 0.75rem 2rem;
  border-radius: 0.6rem;
  background: #f4f7fa;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.note {
  margin-bottom: 0;
  color: #56616c;
  line-height: 1.6;
}
</style>
