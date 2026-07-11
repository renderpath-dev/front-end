<template>
  <section class="page-card">
    <p class="eyebrow">Hydration</p>
    <h2>Fixed hydration pattern</h2>
    <p>
      This page renders deterministic initial content and moves browser-only or
      non-deterministic work to the client after hydration.
    </p>
    <HydrationMismatchFixed />
    <ClientOnly fallback-tag="section" fallback="Browser viewport waits for hydration">
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
