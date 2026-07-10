<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

const inputVisible = ref(true);
const nameInput = useTemplateRef<HTMLInputElement>("typed-name-input");
const refStatus = ref("Waiting for mount.");

function focusInput(): void {
  if (nameInput.value) {
    nameInput.value.focus();
    refStatus.value = "HTMLInputElement is available and focused.";
  } else {
    refStatus.value = "Template ref is null.";
  }
}

onMounted(() => {
  refStatus.value = "Component mounted; the visible input ref is available.";
});
</script>

<template>
  <article class="demo-card">
    <p class="topic">DOM template ref</p>
    <h3>HTMLInputElement or Null</h3>
    <input
      v-if="inputVisible"
      ref="typed-name-input"
      type="text"
      placeholder="Typed DOM ref target"
    />
    <div class="actions">
      <button type="button" @click="focusInput">Focus input</button>
      <button type="button" @click="inputVisible = !inputVisible">
        {{ inputVisible ? "Unmount input" : "Mount input" }}
      </button>
    </div>
    <p>{{ refStatus }}</p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #c8d7e2;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #3a6881;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #87a4b5;
  border-radius: 0.4rem;
}

.actions {
  display: flex;
  gap: 0.45rem;
  margin-top: 0.6rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #7698aa;
  border-radius: 0.4rem;
  background: #f4f8fa;
  cursor: pointer;
}
</style>
