<script setup lang="ts">
definePageMeta({
  layout: "content",
});

interface TocLink {
  readonly title?: string;
  readonly children?: ReadonlyArray<TocLink>;
}

const route = useRoute();
const path = computed(() => route.path);

const { data: page } = await useAsyncData(`docs:${path.value}`, () =>
  queryCollection("docs").path(path.value).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not Found",
    message: "Doc page was not found.",
  });
}

const tocItems = computed(() => {
  const links = page.value?.body?.toc?.links as ReadonlyArray<TocLink> | undefined;
  return flattenTocTitles(links ?? []);
});

function flattenTocTitles(links: ReadonlyArray<TocLink>): ReadonlyArray<string> {
  return links.flatMap((link) => [
    ...(link.title ? [link.title] : []),
    ...flattenTocTitles(link.children ?? []),
  ]);
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
});
</script>

<template>
  <article v-if="page" class="content-page">
    <header>
      <p class="eyebrow">Docs</p>
      <h1>{{ page.title }}</h1>
      <p>{{ page.description }}</p>
    </header>

    <ContentTocPanel :items="tocItems" />
    <ContentRenderer :value="page" />
  </article>
</template>

<style scoped>
.content-page {
  display: grid;
  gap: 1rem;
}

header,
:deep(.content-renderer) {
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
</style>
