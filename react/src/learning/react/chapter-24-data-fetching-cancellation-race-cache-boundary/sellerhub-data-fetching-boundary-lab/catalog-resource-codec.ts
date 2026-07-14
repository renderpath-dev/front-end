import type { CatalogProduct } from './sellerhub-data-fetching-data'

export type CatalogPayloadResult =
  | {
      type: 'valid'
      products: CatalogProduct[]
    }
  | {
      type: 'invalid'
      issue: string
    }

export function parseCatalogPayload(input: unknown): CatalogPayloadResult {
  if (!isRecord(input) || !Array.isArray(input.products)) {
    return { type: 'invalid', issue: 'Payload must include products array' }
  }

  const products: CatalogProduct[] = []

  for (const product of input.products) {
    if (!isRecord(product)) {
      return { type: 'invalid', issue: 'Product must be an object' }
    }

    if (typeof product.id !== 'string' || typeof product.name !== 'string') {
      return { type: 'invalid', issue: 'Product id and name must be strings' }
    }

    if (product.channel !== 'marketplace' && product.channel !== 'retail') {
      return { type: 'invalid', issue: 'Product channel is outside the domain' }
    }

    if (typeof product.revenue !== 'number') {
      return { type: 'invalid', issue: 'Product revenue must be numeric' }
    }

    products.push({
      channel: product.channel,
      id: product.id,
      name: product.name,
      revenue: product.revenue,
    })
  }

  return { type: 'valid', products }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
