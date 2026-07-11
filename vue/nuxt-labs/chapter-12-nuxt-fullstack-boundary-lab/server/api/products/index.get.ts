import type { ProductListResponse } from "../../../shared/types/product";
import { mapProductDto } from "../../../app/utils/productMapper";
import { mockProducts } from "../../utils/mockProducts";
import { ok } from "../../utils/serverResponse";

export default defineEventHandler(() => {
  const response: ProductListResponse = {
    products: mockProducts.map(mapProductDto),
  };

  return ok(response);
});
