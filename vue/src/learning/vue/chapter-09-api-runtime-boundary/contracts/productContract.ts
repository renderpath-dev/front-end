import type { ApiListEnvelope } from "./apiEnvelopeContract";
import type { PaginationQuery } from "./paginationContract";

export type ProductDto = {
  id: string;
  product_name: string;
  category: string;
  unit_price: number;
  stock_count: number;
  status: "active" | "draft";
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft";
};

export type ProductListQuery = PaginationQuery & {
  keyword: string;
};

export type CreateProductPayload = {
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type UpdateProductPayload = CreateProductPayload & {
  status: Product["status"];
};

export type ProductListResponse = ApiListEnvelope<ProductDto>;
