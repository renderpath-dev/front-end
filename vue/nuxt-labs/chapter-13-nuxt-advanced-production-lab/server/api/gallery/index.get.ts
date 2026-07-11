import { galleryImages } from "../../utils/mockGallery";
import type { GalleryListResponse } from "../../../shared/types/gallery";

export default defineEventHandler(() => {
  return {
    images: galleryImages,
  } satisfies GalleryListResponse;
});
