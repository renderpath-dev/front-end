export type ParsedRouteEntityId =
  | { status: 'valid'; entityId: string; numericId: number }
  | { status: 'missing'; reason: string }
  | { status: 'invalid'; reason: string; received: string }

const entityIdPattern = /^(product|order)-(\d{3})$/

export function parseSellerHubEntityId(value: string | undefined): ParsedRouteEntityId {
  if (value === undefined || value.trim().length === 0) {
    return {
      status: 'missing',
      reason: 'Route param is required for this detail page.',
    }
  }

  const match = entityIdPattern.exec(value)

  if (match === null) {
    return {
      status: 'invalid',
      reason: 'Expected a product-000 or order-000 route id.',
      received: value,
    }
  }

  return {
    status: 'valid',
    entityId: value,
    numericId: Number(match[2]),
  }
}
