<script setup lang="ts">
const chapterTitle = "Vue Chapter 01";
const docsUrl = "https://vuejs.org/guide/essentials/template-syntax.html";
const linkId = "template-syntax-docs";
const linkDescription = "Open the official Vue template syntax guide";
</script>

<template>
  <article class="practice-card">
    <p class="topic">Interpolation and attributes</p>
    <h2>{{ chapterTitle }}</h2>
    <p>
      The heading uses text interpolation. The link below uses both the long and
      shorthand attribute-binding forms.
    </p>

    <label v-bind:for="linkId">Official reference</label>
    <a
      :id="linkId"
      :href="docsUrl"
      :aria-label="linkDescription"
      target="_blank"
      rel="noreferrer"
    >
      Read template syntax
    </a>
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

p {
  line-height: 1.6;
}

label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 700;
}

a {
  color: #146c43;
  font-weight: 700;
}
</style>
