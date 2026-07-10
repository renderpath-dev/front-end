<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import ExposedProductEditor from "./ExposedProductEditor.vue";

type EditorInstance = InstanceType<typeof ExposedProductEditor>;

const editor = useTemplateRef<EditorInstance>("product-editor");
const snapshot = ref("No snapshot requested.");

function readSnapshot(): void {
  const draft = editor.value?.getDraftSnapshot();
  snapshot.value = draft
    ? `${draft.name || "(empty)"} · ${draft.status}`
    : "Editor is unavailable.";
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">defineExpose</p>
    <h3>Minimal Public Instance</h3>
    <ExposedProductEditor ref="product-editor" />
    <div class="actions">
      <button type="button" @click="editor?.focusNameInput()">
        Focus child input
      </button>
      <button type="button" @click="editor?.resetDraft()">
        Reset child draft
      </button>
      <button type="button" @click="readSnapshot">Read snapshot</button>
    </div>
    <p>{{ snapshot }}</p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #d6cce0;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #6f5186;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.65rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #9276a5;
  border-radius: 0.4rem;
  background: #faf6fc;
  cursor: pointer;
}
</style>
