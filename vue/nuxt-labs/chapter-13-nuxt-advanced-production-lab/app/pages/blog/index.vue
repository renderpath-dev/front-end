<script setup lang="ts">
definePageMeta({
  layout: "content",
});

const { data: posts } = await useAsyncData("blog-list", () =>
  queryCollection("blog").order("date", "DESC").all(),
);

const cards = computed(() =>
  (posts.value ?? []).map((entry) => toContentCardItem(entry, "blog")),
);

useSeoMeta({
  title: "Blog",
  description: "Content-driven blog posts powered by Nuxt Content.",
});
</script>

<template>
  <section class="page-stack">
    <header>
      <p class="eyebrow">Nuxt Content</p>
      <h1>Blog</h1>
      <p>Blog metadata comes from content frontmatter and page queries.</p>
    </header>

    <div class="card-grid">
      <ContentCard v-for="item in cards" :key="item.path" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}

header {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.eyebrow {
  color: #18794e;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
