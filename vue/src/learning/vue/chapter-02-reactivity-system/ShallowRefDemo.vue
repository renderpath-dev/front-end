<script setup lang="ts">
import { shallowRef } from "vue";

type DocumentState = {
  meta: {
    title: string;
  };
  version: number;
};

const documentState = shallowRef<DocumentState>({
  meta: {
    title: "Draft",
  },
  version: 1,
});

function mutateNestedTitle(): void {
  documentState.value.meta.title = "Nested mutation";
  console.log("Nested value changed without replacing shallowRef.value.");
}

function replaceDocument(): void {
  documentState.value = {
    meta: {
      title: `Published ${documentState.value.version + 1}`,
    },
    version: documentState.value.version + 1,
  };
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">shallowRef</p>
    <h3>Root replacement is the reactive boundary</h3>

    <div class="document-preview">
      <p>Rendered title: <strong>{{ documentState.meta.title }}</strong></p>
      <p>Rendered version: <strong>{{ documentState.version }}</strong></p>
    </div>

    <div class="actions">
      <button type="button" @click="mutateNestedTitle">
        Mutate nested title
      </button>
      <button type="button" @click="replaceDocument">
        Replace shallowRef.value
      </button>
    </div>

    <p class="note">
      The first button mutates the stored object but intentionally does not
      trigger this view. The second replaces <code>.value</code>, so the
      rendered title and version update.
    </p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #d6d3bf;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #756314;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

.document-preview {
  padding: 0.8rem;
  border-radius: 0.65rem;
  background: #fbfaef;
}

.document-preview p {
  margin: 0.35rem 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

button {
  padding: 0.55rem 0.75rem;
  border: 1px solid #bbae75;
  border-radius: 0.5rem;
  background: #fffdf0;
  color: #62540e;
  cursor: pointer;
}

.note {
  margin-bottom: 0;
  color: #635f4c;
  line-height: 1.6;
}
</style>
