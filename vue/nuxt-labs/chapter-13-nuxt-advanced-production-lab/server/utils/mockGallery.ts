import type { GalleryImage } from "../../shared/types/gallery";

export const galleryImages: ReadonlyArray<GalleryImage> = [
  {
    id: "g-100",
    title: "Stable card image",
    description: "Demonstrates fixed dimensions and lazy loading.",
    src: "/images/gallery/stable-card.svg",
    alt: "Geometric card with stable image dimensions",
    width: 960,
    height: 640,
    status: "available",
  },
  {
    id: "g-200",
    title: "Responsive hero image",
    description: "Demonstrates NuxtImg sizes for responsive output.",
    src: "/images/gallery/responsive-hero.svg",
    alt: "Geometric hero image for responsive rendering",
    width: 1280,
    height: 720,
    status: "available",
  },
  {
    id: "g-300",
    title: "Archived provider placeholder",
    description: "Demonstrates provider choice as deployment ownership.",
    src: "/images/gallery/provider-boundary.svg",
    alt: "Geometric image provider boundary placeholder",
    width: 960,
    height: 640,
    status: "archived",
  },
];

export function findGalleryImage(id: string): GalleryImage | null {
  return galleryImages.find((image) => image.id === id) ?? null;
}
