import { z } from "zod";
import { requestValidated } from "../api/httpClient";
import type {
  ApiCallOptions,
  ApiResult,
} from "../api/httpTypes";
import type {
  CreateProductPayload,
  Product,
  ProductDto,
  ProductListQuery,
  UpdateProductPayload,
} from "../contracts/productContract";
import type { PaginatedResult } from "../contracts/paginationContract";
import { createApiSuccessEnvelopeSchema } from "../validators/apiEnvelopeValidator";
import {
  productDetailResponseSchema,
  productListResponseSchema,
  productMutationResponseSchema,
} from "../validators/productValidator";

function mapProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.product_name,
    category: dto.category,
    price: dto.unit_price,
    stock: dto.stock_count,
    status: dto.status,
  };
}

export async function listProducts(
  query: ProductListQuery,
  options: ApiCallOptions = {},
): Promise<ApiResult<PaginatedResult<Product>>> {
  const result = await requestValidated(productListResponseSchema, {
    method: "GET",
    url: "/products",
    params: query,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "products:list" },
  });

  if (!result.ok) return result;

  const data: PaginatedResult<Product> = {
    rows: result.data.data.map(mapProduct),
    meta: result.data.meta,
  };
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}

export async function getProduct(
  productId: string,
  options: ApiCallOptions = {},
): Promise<ApiResult<Product>> {
  const result = await requestValidated(productDetailResponseSchema, {
    method: "GET",
    url: `/products/${productId}`,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "products:detail" },
  });
  if (!result.ok) return result;

  const data = mapProduct(result.data.data);
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}

export async function createProduct(
  payload: CreateProductPayload,
  options: ApiCallOptions = {},
): Promise<ApiResult<Product>> {
  const result = await requestValidated(productMutationResponseSchema, {
    method: "POST",
    url: "/products",
    body: payload,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "products:create" },
  });
  if (!result.ok) return result;

  const data = mapProduct(result.data.data);
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}

export async function updateProduct(
  productId: string,
  payload: UpdateProductPayload,
  options: ApiCallOptions = {},
): Promise<ApiResult<Product>> {
  const result = await requestValidated(productMutationResponseSchema, {
    method: "PATCH",
    url: `/products/${productId}`,
    body: payload,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "products:update" },
  });
  if (!result.ok) return result;

  const data = mapProduct(result.data.data);
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}

const deleteProductResponseSchema = createApiSuccessEnvelopeSchema(
  z.object({ deleted: z.literal(true) }).strict(),
);

export async function deleteProduct(
  productId: string,
  options: ApiCallOptions = {},
): Promise<ApiResult<{ deleted: true }>> {
  const result = await requestValidated(deleteProductResponseSchema, {
    method: "DELETE",
    url: `/products/${productId}`,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "products:delete" },
  });
  if (!result.ok) return result;

  const data = result.data.data;
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}
