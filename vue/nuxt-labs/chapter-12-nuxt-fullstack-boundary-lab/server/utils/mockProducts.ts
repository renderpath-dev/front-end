import type { ProductDto } from "../../shared/types/product";

export const mockProducts: ReadonlyArray<ProductDto> = [
  {
    id: "p-100",
    name: "Universal Rendering Field Guide",
    slug: "universal-rendering-field-guide",
    summary: "A product detail page designed for SSR and SEO practice.",
    price: 49,
    status: "available",
  },
  {
    id: "p-200",
    name: "Hydration Boundary Toolkit",
    slug: "hydration-boundary-toolkit",
    summary: "A practice kit for deterministic server and client rendering.",
    price: 79,
    status: "limited",
  },
  {
    id: "p-300",
    name: "Nitro Server Route Notes",
    slug: "nitro-server-route-notes",
    summary: "A compact guide for server API and custom route boundaries.",
    price: 29,
    status: "archived",
  },
];
