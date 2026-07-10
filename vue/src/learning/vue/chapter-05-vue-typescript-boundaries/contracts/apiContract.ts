import type { Product } from "./productContract";

export type ProductListResponse = {
  items: Array<Product>;
  total: number;
};

export type ProductDetailResponse = {
  item: Product;
};

export type ApiError = {
  code: string;
  message: string;
};

export type Result<Value, Failure> =
  | { ok: true; data: Value }
  | { ok: false; error: Failure };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProductStatus(value: unknown): boolean {
  return (
    value === "draft" ||
    value === "active" ||
    value === "archived"
  );
}

function isProductCategory(value: unknown): boolean {
  return value === "course" || value === "tool";
}

export function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.price === "number" &&
    isProductStatus(value.status) &&
    isProductCategory(value.category) &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string")
  );
}

export function isProductListResponse(
  value: unknown,
): value is ProductListResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.every(isProduct) &&
    typeof value.total === "number"
  );
}

export function toProductListResult(
  value: unknown,
): Result<ProductListResponse, ApiError> {
  if (isProductListResponse(value)) {
    return {
      ok: true,
      data: value,
    };
  }

  return {
    ok: false,
    error: {
      code: "INVALID_PRODUCT_LIST",
      message: "The product list payload failed the local type guard.",
    },
  };
}
