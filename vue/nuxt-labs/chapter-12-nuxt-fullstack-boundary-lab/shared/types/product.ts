export type ProductStatus = "available" | "limited" | "archived";

export interface ProductDto {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly summary: string;
  readonly price: number;
  readonly status: ProductStatus;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly priceLabel: string;
  readonly status: ProductStatus;
}

export interface ProductListResponse {
  readonly products: ReadonlyArray<Product>;
}

export interface ProductDetailResponse {
  readonly product: Product;
}
