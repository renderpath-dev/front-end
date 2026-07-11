<script setup lang="ts">
definePageMeta({
  layout: "content",
});

const { data: docs } = await useAsyncData("docs-list", () =>
  queryCollection("docs").order("title", "ASC").all(),
);

const cards = computed(() =>
  (docs.value ?? []).map((entry) => toContentCardItem(entry, "docs")),
);

const { visibleItems } = useContentNavigation(cards.value);

useSeoMeta({
  title: "Docs",
  description: "Content-driven docs powered by Nuxt Content.",
});
</script>

<template>
  <section class="page-stack">
    <header>
      <p class="eyebrow">Nuxt Content</p>
      <h1>Docs</h1>
      <p>Docs are queried from content files, not duplicated as components.</p>
    </header>

    <ContentQueryPanel />

    <div class="card-grid">
      <ContentCard
        v-for="item in visibleItems"
        :key="item.path"
        :item="item"
      />
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
