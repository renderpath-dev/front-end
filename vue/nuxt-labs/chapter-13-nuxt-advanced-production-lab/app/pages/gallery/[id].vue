<script setup lang="ts">
const route = useRoute();
const id = computed(() => String(route.params.id));
const { data, error } = await useGalleryImage(id.value);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not Found",
    message: "Gallery image was not found.",
  });
}

useSeoMeta({
  title: data.value?.image.title ?? "Gallery image",
  description: data.value?.image.description ?? "Image detail page.",
});
</script>

<template>
  <ImageDetailPanel v-if="data" :image="data.image" />
</template>
