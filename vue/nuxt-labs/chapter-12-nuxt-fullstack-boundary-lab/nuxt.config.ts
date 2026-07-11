export default defineNuxtConfig({
  compatibilityDate: "2026-07-10",
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: "server-only-demo-secret",
    public: {
      apiBase: "/api",
      appTitle: "Nuxt Full-stack Boundary Lab",
    },
  },
  routeRules: {
    "/rendering/ssr": { ssr: true },
    "/rendering/prerendered": { prerender: true },
    "/rendering/hybrid": { swr: 60 },
    "/admin/**": { ssr: false },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
