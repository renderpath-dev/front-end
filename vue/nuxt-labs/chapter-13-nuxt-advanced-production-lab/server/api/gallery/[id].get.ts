import { findGalleryImage } from "../../utils/mockGallery";
import type { GalleryDetailResponse } from "../../../shared/types/gallery";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const image = id ? findGalleryImage(id) : null;

  if (!image) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "Gallery image was not found.",
    });
  }

  return {
    image,
  } satisfies GalleryDetailResponse;
});
