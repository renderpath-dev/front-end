<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const modules = [
  "@nuxt/content",
  "@nuxt/image",
  "nuxt-auth-utils",
] as const;

useSeoMeta({
  title: runtimeConfig.public.appTitle,
  description:
    "Advanced Nuxt module, content, image, session, layer, and testing lab.",
});
</script>

<template>
  <section class="hero">
    <p class="eyebrow">Chapter 13</p>
    <h1>{{ runtimeConfig.public.appTitle }}</h1>
    <p>
      This lab extends the Chapter 12 Nuxt boundary into modules, content,
      image handling, sealed cookie sessions, local layers, protected routes,
      and focused tests.
    </p>
    <div class="module-row">
      <ModuleBoundaryBadge
        v-for="moduleName in modules"
        :key="moduleName"
        :label="moduleName"
      />
    </div>
  </section>

  <section class="link-grid" aria-label="Advanced Nuxt lab routes">
    <NuxtLink to="/docs">Content docs</NuxtLink>
    <NuxtLink to="/blog">Content blog</NuxtLink>
    <NuxtLink to="/gallery">Image gallery</NuxtLink>
    <NuxtLink to="/login">Session login</NuxtLink>
    <NuxtLink to="/dashboard">Protected dashboard</NuxtLink>
    <NuxtLink to="/testing">Testing map</NuxtLink>
  </section>

  <LayerCard />
</template>

<style scoped>
.hero,
.link-grid {
  padding: 1.5rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.hero h1 {
  max-width: 820px;
  margin: 0.35rem 0 0.7rem;
  font-size: clamp(2rem, 6vw, 4rem);
  line-height: 1.08;
}

.hero p {
  max-width: 780px;
  line-height: 1.7;
}

.eyebrow {
  color: #18794e;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.module-row,
.link-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.link-grid {
  margin-top: 1rem;
}

.link-grid a {
  border-radius: 999px;
  padding: 0.6rem 0.9rem;
  color: #18794e;
  background: #e7efea;
  font-weight: 800;
  text-decoration: none;
}
</style>
