<script setup lang="ts">
import { useLocalStorage } from "../composables/useLocalStorage";

const {
  value: draftTitle,
  storageError,
  reset,
} = useLocalStorage(
  "vue-chapter-04-draft-title",
  "Reusable logic draft",
);
</script>

<template>
  <article class="demo-card">
    <p class="topic">Browser side effect</p>
    <h3>Persistent Draft Title</h3>
    <label for="stored-title">Draft title</label>
    <input id="stored-title" v-model="draftTitle" type="text" />
    <p>Serialized after a reactive change: {{ draftTitle }}</p>
    <p v-if="storageError" class="error">
      {{ storageError.message }}
    </p>
    <button type="button" @click="reset">Reset stored draft</button>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.2rem;
  border: 1px solid #ddd2bb;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #8a5c19;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.85rem;
}

label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 700;
}

input {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid #bea773;
  border-radius: 0.4rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #b3904d;
  border-radius: 0.4rem;
  background: #fff8e9;
  cursor: pointer;
}

.error {
  color: #b42318;
}
</style>
