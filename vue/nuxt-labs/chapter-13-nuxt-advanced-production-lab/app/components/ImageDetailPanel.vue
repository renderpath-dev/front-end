<script setup lang="ts">
import type { GalleryImage } from "../../shared/types/gallery";

defineProps<{
  image: GalleryImage;
}>();
</script>

<template>
  <article class="image-detail">
    <NuxtPicture
      :src="image.src"
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      format="webp"
      sizes="sm:100vw md:80vw lg:960px"
    />
    <div>
      <p class="eyebrow">{{ image.status }}</p>
      <h1>{{ image.title }}</h1>
      <p>{{ image.description }}</p>
    </div>
  </article>
</template>

<style scoped>
.image-detail {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

:deep(img) {
  width: 100%;
  height: auto;
  border-radius: 0.8rem;
}

.eyebrow {
  color: #18794e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
