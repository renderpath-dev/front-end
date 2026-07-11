<script setup lang="ts">
const { data, pending, error } = await useGalleryImages();

useSeoMeta({
  title: "Image Gallery",
  description: "Nuxt Image examples with layout-stable image cards.",
});
</script>

<template>
  <section class="page-stack">
    <header>
      <p class="eyebrow">Nuxt Image</p>
      <h1>Image gallery</h1>
      <p>
        Images use declared dimensions and lazy loading. This page does not
        claim performance gains without measurement.
      </p>
    </header>

    <p v-if="pending">Loading images...</p>
    <p v-else-if="error">Image API failed.</p>
    <div v-else class="gallery-grid">
      <ImageGalleryCard
        v-for="image in data?.images ?? []"
        :key="image.id"
        :image="image"
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
