<script setup lang="ts">
import { reactive, readonly, ref, unref } from "vue";
import type { Ref } from "vue";

const sourceState = reactive({
  count: 1,
  label: "Mutable source",
});
const readonlyState = readonly(sourceState);
const labelRef = ref("Ref input");
const plainLabel = "Plain input";
const lastRead = ref("No value read yet.");

function readValue(input: string | Ref<string>): string {
  return unref(input);
}

function readBothInputs(): void {
  lastRead.value =
    `${readValue(labelRef)} | ${readValue(plainLabel)}`;
}

function incrementThroughSource(): void {
  sourceState.count += 1;
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">readonly and unref</p>
    <h3>Protected write surface and normalized reads</h3>

    <div class="state-row">
      <p>Mutable source count: <strong>{{ sourceState.count }}</strong></p>
      <p>Readonly view count: <strong>{{ readonlyState.count }}</strong></p>
    </div>

    <div class="actions">
      <button type="button" @click="incrementThroughSource">
        Mutate original source
      </button>
      <button type="button" @click="readBothInputs">
        Read ref and plain value
      </button>
    </div>

    <p class="result">{{ lastRead }}</p>
    <p class="note">
      The readonly proxy blocks writes through that proxy, but the original
      source can still change. <code>unref()</code> returns <code>.value</code>
      for a ref and returns a plain input unchanged.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #d4d4df;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #545482;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

.state-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.state-row p,
.result {
  padding: 0.75rem;
  border-radius: 0.6rem;
  background: #f5f5fa;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #aaaac4;
  border-radius: 0.5rem;
  background: #f3f3fb;
  color: #45456f;
  cursor: pointer;
}

.note {
  margin-bottom: 0;
  color: #5e5e69;
  line-height: 1.6;
}
</style>
