<script setup lang="ts">
import type { GalleryImage } from "../../shared/types/gallery";

defineProps<{
  image: GalleryImage;
}>();
</script>

<template>
  <NuxtLink class="gallery-card" :to="`/gallery/${image.id}`">
    <div class="image-frame">
      <NuxtImg
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        sizes="sm:100vw md:50vw lg:33vw"
        loading="lazy"
      />
    </div>
    <h3>{{ image.title }}</h3>
    <p>{{ image.description }}</p>
  </NuxtLink>
</template>

<style scoped>
.gallery-card {
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  color: inherit;
  background: #ffffff;
  text-decoration: none;
}

.image-frame {
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 0.8rem;
  background: #e7efea;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h3,
p {
  margin: 0;
}
</style>
