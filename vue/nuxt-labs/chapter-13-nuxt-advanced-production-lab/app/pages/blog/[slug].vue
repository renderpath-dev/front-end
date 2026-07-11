<script setup lang="ts">
definePageMeta({
  layout: "content",
});

const route = useRoute();
const slug = computed(() => String(route.params.slug));
const contentPath = computed(() => `/blog/${slug.value}`);

const { data: post } = await useAsyncData(`blog:${contentPath.value}`, () =>
  queryCollection("blog").path(contentPath.value).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not Found",
    message: "Blog post was not found.",
  });
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
});
</script>

<template>
  <article v-if="post" class="content-page">
    <header>
      <p class="eyebrow">{{ post.date }}</p>
      <h1>{{ post.title }}</h1>
      <p>{{ post.description }}</p>
    </header>

    <ContentRenderer :value="post" />
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
