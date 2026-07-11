<template>
  <section class="chapter-card command-card">
    <h3>Run the separate Chapter 13 Nuxt lab</h3>
    <ol>
      <li><code>cd nuxt-labs/chapter-13-nuxt-advanced-production-lab</code></li>
      <li><code>npm install</code></li>
      <li><code>npm run prepare</code></li>
      <li><code>npm run typecheck</code></li>
      <li><code>npm run test</code></li>
      <li><code>npm run dev</code></li>
      <li><code>npm run build</code></li>
      <li><code>npm run generate</code></li>
      <li><code>npm run preview</code></li>
    </ol>
    <p>Dev URL: <code>http://localhost:3040</code></p>
    <p>Preview URL: <code>http://localhost:3041</code></p>
  </section>
</template>

<style scoped>
.chapter-card {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.command-card {
  background: #f8fbf9;
}

h3 {
  margin-top: 0;
}

ol {
  display: grid;
  gap: 0.4rem;
  padding-left: 1.3rem;
}

code {
  padding: 0.12rem 0.3rem;
  border-radius: 0.3rem;
  background: #e7efea;
}
</style>
