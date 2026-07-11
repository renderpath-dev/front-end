<script setup lang="ts">
const generatedAt = useState<string>("hybrid-generated-at", () =>
  new Date().toISOString(),
);
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">Rendering</p>
    <h2>Hybrid route rule</h2>
    <RenderingModeBadge mode="hybrid" />
    <p>
      The Nuxt config gives this route an swr value. The exact cache behavior
      depends on the Nitro preset used for the production target.
    </p>
    <ServerResultPanel
      label="Route rule demo"
      status="swr"
      :description="generatedAt"
    />
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
