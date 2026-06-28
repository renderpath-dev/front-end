export type CatalogProductDto = {
  product_id: string
  display_name: string
  price_cents: number
  stock_count: number
}

export function isCatalogProductDto(value: unknown): value is CatalogProductDto {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.product_id === 'string' &&
    typeof candidate.display_name === 'string' &&
    typeof candidate.price_cents === 'number' &&
    Number.isInteger(candidate.price_cents) &&
    typeof candidate.stock_count === 'number' &&
    Number.isInteger(candidate.stock_count)
  )
}
