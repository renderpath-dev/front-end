<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

const focusInputElement = useTemplateRef<HTMLInputElement>("focus-input");
const mountedStatus = ref("Waiting for mount.");

function focusInput(): void {
  focusInputElement.value?.focus();
}

onMounted(() => {
  mountedStatus.value = "Mounted: the DOM input reference is available.";
  focusInput();
});

defineExpose({
  focusInput,
});
</script>

<template>
  <article class="practice-card">
    <p class="topic">Template refs</p>
    <h3>DOM Focus Boundary</h3>
    <label for="focus-target">Focus target</label>
    <input
      id="focus-target"
      ref="focus-input"
      type="text"
      placeholder="Focused after mount"
    />
    <button type="button" @click="focusInput">Focus input again</button>
    <p>{{ mountedStatus }}</p>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #d9d0e2;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #704a8e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 0.65rem;
  border: 1px solid #b9aac6;
  border-radius: 0.5rem;
}

button {
  margin-top: 0.65rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid #8e6ca7;
  border-radius: 0.5rem;
  background: #f7f0fc;
  color: #65427f;
  cursor: pointer;
}
</style>
