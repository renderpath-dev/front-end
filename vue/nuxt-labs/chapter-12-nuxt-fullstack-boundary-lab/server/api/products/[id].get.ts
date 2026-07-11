import type { ProductDetailResponse } from "../../../shared/types/product";
import { mapProductDto } from "../../../app/utils/productMapper";
import { mockProducts } from "../../utils/mockProducts";
import { ok } from "../../utils/serverResponse";

export default defineEventHandler((event) => {
  const productId = getRouterParam(event, "id") ?? "";
  const product = mockProducts.find((candidate) => candidate.id === productId);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const response: ProductDetailResponse = {
    product: mapProductDto(product),
  };

  return ok(response);
});
