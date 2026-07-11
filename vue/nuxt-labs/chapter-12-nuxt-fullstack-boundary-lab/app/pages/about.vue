<template>
  <section class="page-card">
    <p class="eyebrow">About</p>
    <h2>Why this lab is separate from the Vite shell</h2>
    <p>
      Nuxt owns application creation, route generation, server rendering, Nitro
      handlers, runtime config, and output generation. A Vite SPA can explain
      those boundaries, but it should not pretend to run the Nuxt lifecycle in a
      normal component.
    </p>
  </section>
</template>

<style scoped>
.page-card {
  padding: 1.5rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h2,
p {
  margin: 0 0 0.75rem;
}

p {
  line-height: 1.7;
}

.eyebrow {
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
