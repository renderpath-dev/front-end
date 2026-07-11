import type { ApiResult } from "../../shared/types/api";
import type { ProductDetailResponse } from "../../shared/types/product";

export function useProductDetail(productId: string) {
  return useFetch<ApiResult<ProductDetailResponse>>(`/api/products/${productId}`, {
    key: `product:${productId}`,
  });
}
