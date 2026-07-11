export interface NuxtDirectoryEntry {
  readonly path: string;
  readonly owner: string;
  readonly purpose: string;
}

export const nuxtDirectoryEntries: ReadonlyArray<NuxtDirectoryEntry> = [
  {
    path: "app.vue",
    owner: "Nuxt app root",
    purpose: "Renders NuxtLayout and NuxtPage",
  },
  {
    path: "app/pages",
    owner: "File-system router",
    purpose: "Creates route records from Vue files",
  },
  {
    path: "app/layouts",
    owner: "Page wrapper layer",
    purpose: "Wraps selected pages through definePageMeta",
  },
  {
    path: "app/middleware",
    owner: "Vue route navigation layer",
    purpose: "Runs before page navigation, not for server endpoints",
  },
  {
    path: "server/api",
    owner: "Nitro API layer",
    purpose: "Registers JSON endpoints under /api",
  },
  {
    path: "server/routes",
    owner: "Nitro route layer",
    purpose: "Registers custom server routes outside /api",
  },
];
