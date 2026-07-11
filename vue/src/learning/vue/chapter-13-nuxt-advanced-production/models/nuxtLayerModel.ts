export interface NuxtLayerBoundaryItem {
  readonly concept: string;
  readonly meaning: string;
}

export const nuxtLayerBoundaryItems: ReadonlyArray<NuxtLayerBoundaryItem> = [
  {
    concept: "Local layer",
    meaning: "A reusable partial Nuxt app extended by the Chapter 13 lab.",
  },
  {
    concept: "Priority",
    meaning: "Project files override layer files when they define the same surface.",
  },
  {
    concept: "Ownership",
    meaning: "The layer owns reusable UI primitives, not business authentication logic.",
  },
];
