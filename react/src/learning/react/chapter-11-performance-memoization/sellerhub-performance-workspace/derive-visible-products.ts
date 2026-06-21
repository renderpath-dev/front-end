import type { PerformanceProduct } from './sellerhub-performance-data'

export type ProductSort = 'price-asc' | 'price-desc'

export type VisibleProductResult = {
  checksum: number
  products: PerformanceProduct[]
}

export function deriveVisibleProducts(
  products: PerformanceProduct[],
  query: string,
  sort: ProductSort,
): VisibleProductResult {
  let checksum = 0

  for (let index = 0; index < 80_000; index += 1) {
    checksum = (checksum + index + products.length) % 2_009
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products
    .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
    .sort((left, right) =>
      sort === 'price-asc' ? left.price - right.price : right.price - left.price,
    )

  return { checksum, products: visibleProducts }
}
