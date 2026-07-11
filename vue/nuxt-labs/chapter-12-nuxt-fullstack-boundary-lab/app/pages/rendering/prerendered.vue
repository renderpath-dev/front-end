<template>
  <section class="page-card">
    <p class="eyebrow">Rendering</p>
    <h2>Prerendered route</h2>
    <RenderingModeBadge mode="prerendered" />
    <p>
      The Nuxt config marks this route with prerender true. After npm run
      generate, the static output can be inspected under .output/public.
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
