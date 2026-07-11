export type RouteModeName = "ssr" | "csr" | "prerendered" | "hybrid";

export interface RouteModeLabel {
  readonly mode: RouteModeName;
  readonly label: string;
  readonly description: string;
}

export const routeModeLabels: Readonly<Record<RouteModeName, RouteModeLabel>> =
  {
    ssr: {
      mode: "ssr",
      label: "SSR",
      description: "Rendered for each matching request by the Nuxt server.",
    },
    csr: {
      mode: "csr",
      label: "CSR",
      description: "Interactive behavior waits for browser hydration.",
    },
    prerendered: {
      mode: "prerendered",
      label: "SSG",
      description: "Generated as static HTML when the route is prerendered.",
    },
    hybrid: {
      mode: "hybrid",
      label: "Hybrid",
      description: "Uses route rules to mix rendering and cache behavior.",
    },
  };

export function getRouteModeLabel(mode: RouteModeName): RouteModeLabel {
  return routeModeLabels[mode];
}
