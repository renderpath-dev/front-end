<template>
  <nav class="app-navigation" aria-label="Nuxt lab navigation">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
    <NuxtLink to="/products">Products</NuxtLink>
    <NuxtLink to="/data/use-fetch">useFetch</NuxtLink>
    <NuxtLink to="/data/use-async-data">useAsyncData</NuxtLink>
    <NuxtLink to="/rendering/ssr">SSR</NuxtLink>
    <NuxtLink to="/rendering/csr">CSR</NuxtLink>
    <NuxtLink to="/rendering/prerendered">SSG</NuxtLink>
    <NuxtLink to="/rendering/hybrid">Hybrid</NuxtLink>
    <NuxtLink to="/hydration/fixed">Hydration fixed</NuxtLink>
    <NuxtLink to="/config">Config</NuxtLink>
    <NuxtLink to="/seo">SEO</NuxtLink>
  </nav>
</template>

<style scoped>
.app-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

a {
  padding: 0.55rem 0.75rem;
  border: 1px solid #cfe0d7;
  border-radius: 999px;
  color: #18794e;
  font-weight: 800;
  text-decoration: none;
}

a.router-link-active {
  background: #18794e;
  color: #ffffff;
}
</style>
