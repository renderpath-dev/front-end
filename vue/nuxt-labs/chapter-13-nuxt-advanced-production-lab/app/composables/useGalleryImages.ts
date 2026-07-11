import type {
  GalleryDetailResponse,
  GalleryListResponse,
} from "../../shared/types/gallery";

export function useGalleryImages() {
  return useFetch<GalleryListResponse>("/api/gallery");
}

export function useGalleryImage(id: string) {
  return useFetch<GalleryDetailResponse>(`/api/gallery/${id}`);
}
