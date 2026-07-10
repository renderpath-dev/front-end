<script setup lang="ts">
import { ref } from "vue";

const isHighlighted = ref(false);
const accentColor = ref("#42b883");
const fontSize = ref(18);
</script>

<template>
  <article class="practice-card">
    <p class="topic">Class and style binding</p>
    <h2>Dynamic Presentation</h2>

    <p
      class="preview"
      :class="{ highlighted: isHighlighted }"
      :style="{ color: accentColor, fontSize: `${fontSize}px` }"
    >
      Bind presentation to JavaScript values.
    </p>

    <label class="checkbox-label">
      <input v-model="isHighlighted" type="checkbox" />
      Highlight preview
    </label>

    <label>
      Accent color
      <input v-model="accentColor" type="color" />
    </label>

    <label>
      Font size
      <input v-model.number="fontSize" type="range" min="14" max="32" />
    </label>
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

.preview {
  padding: 0.8rem;
  border: 1px dashed #b4c8bd;
  border-radius: 0.5rem;
  transition:
    color 160ms ease,
    background 160ms ease;
}

.highlighted {
  background: #eaf8f0;
  font-weight: 800;
}

label {
  display: grid;
  gap: 0.35rem;
  margin-top: 0.65rem;
  font-weight: 700;
}

.checkbox-label {
  grid-template-columns: auto 1fr;
  align-items: center;
}

input[type="color"] {
  width: 3rem;
  height: 2rem;
  padding: 0;
  border: 0;
  background: transparent;
}
</style>
