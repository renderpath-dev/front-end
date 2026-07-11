import type { ApiResult } from "../../shared/types/api";
import type { ProductListResponse } from "../../shared/types/product";

export function useProductList() {
  return useFetch<ApiResult<ProductListResponse>>("/api/products", {
    key: "products:list",
  });
}
