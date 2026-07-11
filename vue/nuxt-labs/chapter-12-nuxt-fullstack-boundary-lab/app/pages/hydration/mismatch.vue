<template>
  <section class="page-card">
    <p class="eyebrow">Hydration</p>
    <h2>Intentional mismatch route</h2>
    <p>
      This route isolates a bad example so the default lab path stays usable.
      The random value can differ between server render and client hydration.
    </p>
    <HydrationMismatchBad />
  </section>
</template>

<style scoped>
.page-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #ffd6a4;
  border-radius: 1rem;
  background: #fff8ed;
}

h2,
p {
  margin: 0;
}

.eyebrow {
  color: #9a5b00;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
