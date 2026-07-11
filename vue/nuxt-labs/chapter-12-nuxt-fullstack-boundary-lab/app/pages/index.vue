<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
  title: config.public.appTitle,
  description: "Nuxt Chapter 12 practice lab for rendering and full-stack boundaries.",
});

const links: ReadonlyArray<{ readonly to: string; readonly label: string }> = [
  { to: "/products", label: "Products and dynamic routes" },
  { to: "/data/use-fetch", label: "useFetch data page" },
  { to: "/data/use-async-data", label: "useAsyncData data page" },
  { to: "/rendering/ssr", label: "SSR route" },
  { to: "/rendering/csr", label: "CSR route" },
  { to: "/rendering/prerendered", label: "Prerendered route" },
  { to: "/rendering/hybrid", label: "Hybrid route" },
  { to: "/hydration/fixed", label: "Hydration fixed pattern" },
  { to: "/config", label: "Runtime config" },
  { to: "/seo", label: "SEO and meta" },
  { to: "/admin?allow=admin", label: "Admin layout demo" },
];
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">Home</p>
    <h2>{{ config.public.appTitle }}</h2>
    <p>
      This lab is a standalone Nuxt app. It demonstrates file-based routing,
      layouts, route middleware, plugins, server routes, runtime config,
      hydration boundaries, and Nuxt deployment output without changing the
      root Vite learning shell.
    </p>
    <div class="link-grid">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
        {{ link.label }}
      </NuxtLink>
    </div>
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

.page-card h2,
.page-card p {
  margin: 0;
}

.page-card p {
  max-width: 58rem;
  line-height: 1.7;
}

.eyebrow {
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

a {
  padding: 1rem;
  border-radius: 0.8rem;
  background: #e7f8ef;
  color: #18794e;
  font-weight: 800;
  text-decoration: none;
}
</style>
