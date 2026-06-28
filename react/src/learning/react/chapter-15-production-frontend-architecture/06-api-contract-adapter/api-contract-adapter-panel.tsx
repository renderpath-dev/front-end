type ProductDto = {
  product_id: string
  display_name: string
  price_cents: number
  published_at: string
}

type ProductDomainModel = {
  id: string
  name: string
  priceInCents: number
  publishedAt: Date
}

type ProductViewModel = {
  id: string
  title: string
  priceLabel: string
  publishedLabel: string
}

const productResponse: unknown = {
  product_id: 'product-301',
  display_name: 'Task Chair',
  price_cents: 12900,
  published_at: '2026-06-20T09:00:00.000Z',
}

function isProductDto(value: unknown): value is ProductDto {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.product_id === 'string' &&
    typeof candidate.display_name === 'string' &&
    typeof candidate.price_cents === 'number' &&
    typeof candidate.published_at === 'string'
  )
}

function toProductDomainModel(dto: ProductDto): ProductDomainModel {
  return {
    id: dto.product_id,
    name: dto.display_name,
    priceInCents: dto.price_cents,
    publishedAt: new Date(dto.published_at),
  }
}

function toProductViewModel(product: ProductDomainModel): ProductViewModel {
  return {
    id: product.id,
    title: product.name,
    priceLabel: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(product.priceInCents / 100),
    publishedLabel: new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(product.publishedAt),
  }
}

export function ApiContractAdapterPanel() {
  if (!isProductDto(productResponse)) {
    return (
      <section className="chapter15-panel">
        <h2>API contract rejected</h2>
      </section>
    )
  }

  const domainModel = toProductDomainModel(productResponse)
  const viewModel = toProductViewModel(domainModel)

  return (
    <section className="chapter15-panel">
      <p className="chapter15-eyebrow">9.6 API contract adapter</p>
      <h2>Unknown response to DTO to domain model to view model</h2>
      <article className="chapter15-card">
        <h3>{viewModel.title}</h3>
        <p>{viewModel.priceLabel}</p>
        <p>Published {viewModel.publishedLabel}</p>
        <code>{viewModel.id}</code>
      </article>
    </section>
  )
}
