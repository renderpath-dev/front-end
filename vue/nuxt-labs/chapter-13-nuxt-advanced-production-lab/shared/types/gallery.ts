export type GalleryImageStatus = "available" | "archived";

export interface GalleryImage {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly status: GalleryImageStatus;
}

export interface GalleryListResponse {
  readonly images: ReadonlyArray<GalleryImage>;
}

export interface GalleryDetailResponse {
  readonly image: GalleryImage;
}
