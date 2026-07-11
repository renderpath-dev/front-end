export interface NuxtContentBoundaryItem {
  readonly area: string;
  readonly owner: string;
  readonly check: string;
}

export const nuxtContentBoundaryItems: ReadonlyArray<NuxtContentBoundaryItem> =
  [
    {
      area: "Content source",
      owner: "content/docs and content/blog",
      check: "Pages query content instead of hardcoding every article.",
    },
    {
      area: "Content route",
      owner: "app/pages/docs and app/pages/blog",
      check: "Missing slugs must become a controlled 404.",
    },
    {
      area: "Content SEO",
      owner: "frontmatter plus useSeoMeta",
      check: "Metadata describes the page without claiming ranking gains.",
    },
  ];
