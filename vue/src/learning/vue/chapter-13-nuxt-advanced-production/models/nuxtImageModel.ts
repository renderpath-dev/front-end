export interface NuxtImageBoundaryItem {
  readonly topic: string;
  readonly rule: string;
}

export const nuxtImageBoundaryItems: ReadonlyArray<NuxtImageBoundaryItem> = [
  {
    topic: "Layout stability",
    rule: "Gallery images declare width, height, and aspect-ratio containers.",
  },
  {
    topic: "Optimization boundary",
    rule: "Nuxt Image can generate optimized URLs, but performance still requires measurement.",
  },
  {
    topic: "Provider boundary",
    rule: "Provider choice is deployment-specific and stays local in this lab.",
  },
];
