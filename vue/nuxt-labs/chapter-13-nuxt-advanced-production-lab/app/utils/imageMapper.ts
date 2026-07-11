import type { GalleryImage } from "../../shared/types/gallery";

export interface GalleryImageViewModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly statusLabel: string;
}

export function toGalleryImageViewModel(
  image: GalleryImage,
): GalleryImageViewModel {
  return {
    id: image.id,
    title: image.title,
    description: image.description,
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    statusLabel: image.status,
  };
}
