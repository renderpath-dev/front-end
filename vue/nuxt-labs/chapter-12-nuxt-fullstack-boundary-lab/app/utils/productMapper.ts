import type { Product, ProductDto } from "../../shared/types/product";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

export function mapProductDto(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.name,
    summary: dto.summary,
    priceLabel: currencyFormatter.format(dto.price),
    status: dto.status,
  };
}
