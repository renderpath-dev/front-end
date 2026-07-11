const isProduction = process.env.NODE_ENV === "production";

export default defineNuxtConfig({
  compatibilityDate: "2026-07-11",
  devtools: { enabled: true },
  extends: ["./layers/base-ui"],
  modules: ["@nuxt/content", "@nuxt/image", "nuxt-auth-utils"],
  runtimeConfig: {
    session: {
      name: "nuxt-session",
      password: process.env.NUXT_SESSION_PASSWORD || "",
      cookie: {
        sameSite: "lax",
        secure: isProduction,
      },
    },
    privateReportSecret: "server-only-report-secret",
    public: {
      appTitle: "Nuxt Advanced Production Lab",
      imageBasePath: "/",
    },
  },
  routeRules: {
    "/docs/**": { prerender: true },
    "/blog/**": { ssr: true },
    "/dashboard": { ssr: false },
    "/admin/**": { ssr: false },
  },
  image: {
    provider: "ipx",
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
      xl: 1280,
    },
  },
  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      include: ["../tests/**/*.ts", "../shared/**/*.d.ts"],
    },
  },
});
