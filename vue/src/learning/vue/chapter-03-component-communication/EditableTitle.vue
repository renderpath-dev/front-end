<script setup lang="ts">
const title = defineModel<string>({ required: true });

function updateTitle(event: Event): void {
  if (event.currentTarget instanceof HTMLInputElement) {
    title.value = event.currentTarget.value;
  }
}
</script>

<template>
  <article class="practice-card">
    <p class="topic">Component v-model</p>
    <h3>Editable Title</h3>
    <label for="editable-title">Title</label>
    <input
      id="editable-title"
      :value="title"
      type="text"
      @input="updateTitle"
    />
    <p>Child model ref: <strong>{{ title }}</strong></p>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #d8d1e4;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #6746a1;
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
  border: 1px solid #b8acd0;
  border-radius: 0.5rem;
}
</style>
