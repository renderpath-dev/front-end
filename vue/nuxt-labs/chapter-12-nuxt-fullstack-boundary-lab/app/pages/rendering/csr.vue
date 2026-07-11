<template>
  <section class="page-card">
    <p class="eyebrow">Rendering</p>
    <h2>Client-only boundary</h2>
    <RenderingModeBadge mode="csr" />
    <p>
      Browser-only data is isolated behind ClientOnly so the server render does
      not try to read window or viewport state.
    </p>
    <ClientOnly fallback-tag="section" fallback="Waiting for client hydration">
      <ClientOnlyViewport />
    </ClientOnly>
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
