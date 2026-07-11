<script setup lang="ts">
useSeoMeta({
  title: "Nuxt SEO Boundary Lab",
  description: "SSR HTML can include metadata, but metadata does not guarantee ranking.",
  ogTitle: "Nuxt SEO Boundary Lab",
  ogDescription: "A Chapter 12 Nuxt practice route for meta rendering.",
});

useHead({
  link: [{ rel: "canonical", href: "http://localhost:3030/seo" }],
});
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">SEO</p>
    <h2>SEO and meta route</h2>
    <p>
      Nuxt can render head metadata into SSR HTML. This improves crawler
      visibility for server-rendered content, but it does not promise search
      ranking.
    </p>
  </section>
</template>

<style scoped>
.page-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h2,
p {
  margin: 0;
}

.eyebrow {
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
