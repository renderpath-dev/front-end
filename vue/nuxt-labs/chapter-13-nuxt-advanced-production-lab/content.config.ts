import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: "docs/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        navigation: z.boolean().default(true),
      }),
    }),
    blog: defineCollection({
      source: "blog/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        navigation: z.boolean().default(true),
      }),
    }),
  },
});
