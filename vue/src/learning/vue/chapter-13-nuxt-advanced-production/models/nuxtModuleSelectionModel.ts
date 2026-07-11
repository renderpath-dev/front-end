export interface NuxtModuleSelectionItem {
  readonly name: string;
  readonly role: string;
  readonly boundary: string;
}

export const nuxtModuleSelectionItems: ReadonlyArray<NuxtModuleSelectionItem> =
  [
    {
      name: "@nuxt/content",
      role: "Turns content files into queryable application data.",
      boundary: "Content ownership and build/runtime indexing.",
    },
    {
      name: "@nuxt/image",
      role: "Provides NuxtImg and NuxtPicture image rendering utilities.",
      boundary: "Image URL generation, size hints, provider behavior, and layout stability.",
    },
    {
      name: "nuxt-auth-utils",
      role: "Provides sealed cookie session helpers for server and client code.",
      boundary: "Session state belongs to server authority, not localStorage.",
    },
  ];
