export type RenderingModeName = "SSR" | "CSR" | "SSG" | "Hybrid";

export interface RenderingModeCard {
  readonly name: RenderingModeName;
  readonly owner: string;
  readonly trigger: string;
  readonly output: string;
  readonly projectFit: string;
}

export const renderingModeCards: ReadonlyArray<RenderingModeCard> = [
  {
    name: "SSR",
    owner: "Nitro request renderer",
    trigger: "Each matching request",
    output: "HTML plus payload plus client bundle",
    projectFit: "SEO-sensitive product, marketing, and content pages",
  },
  {
    name: "CSR",
    owner: "Browser Vue runtime",
    trigger: "Client bundle execution",
    output: "Client-rendered DOM after JavaScript loads",
    projectFit: "Authenticated dashboards with low SEO requirements",
  },
  {
    name: "SSG",
    owner: "Nitro prerender crawler",
    trigger: "Build-time route discovery",
    output: "Static HTML and payload files in .output/public",
    projectFit: "Stable content that can be regenerated on deployment",
  },
  {
    name: "Hybrid",
    owner: "Nuxt routeRules",
    trigger: "Per-route rendering policy",
    output: "Mixed SSR, prerendered, client-only, or cached responses",
    projectFit: "Apps where content, admin, and catalog routes have different needs",
  },
];
