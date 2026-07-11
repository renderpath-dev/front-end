export interface BoundaryComparisonRow {
  readonly topic: string;
  readonly viteSpa: string;
  readonly nuxtApp: string;
}

export const boundaryComparisonRows: ReadonlyArray<BoundaryComparisonRow> = [
  {
    topic: "Application root",
    viteSpa: "src main entry creates the app with createApp",
    nuxtApp: "Nuxt owns app creation and renders app.vue, layouts, and pages",
  },
  {
    topic: "Routing",
    viteSpa: "Manual Vue Router route records",
    nuxtApp: "Routes generated from app/pages file names",
  },
  {
    topic: "Server code",
    viteSpa: "No local server runtime in the client bundle",
    nuxtApp: "server/api and server/routes run in Nitro",
  },
  {
    topic: "Build output",
    viteSpa: "dist contains static assets",
    nuxtApp: ".output can contain a server runtime and public prerendered assets",
  },
];
