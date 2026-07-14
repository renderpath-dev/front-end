import { sellerHubOrders, sellerHubProducts } from './sellerhub-data-fetching-data'
import type { CatalogProduct, OrderSummary } from './sellerhub-data-fetching-data'

export type DemoApiClient = {
  getCatalogResource: (
    query: string,
    signal: AbortSignal,
  ) => Promise<readonly CatalogProduct[]>
  getOrdersResource: (signal: AbortSignal) => Promise<readonly OrderSummary[]>
  searchCatalogResource: (
    query: string,
    signal: AbortSignal,
    latencyMs?: number,
  ) => Promise<readonly CatalogProduct[]>
}

export function createSellerHubDemoApiClient(): DemoApiClient {
  return {
    getCatalogResource(query: string, signal: AbortSignal) {
      return resolveAfterDelay(filterProducts(query), signal, 20)
    },
    getOrdersResource(signal: AbortSignal) {
      return resolveAfterDelay(sellerHubOrders, signal, 20)
    },
    searchCatalogResource(query: string, signal: AbortSignal, latencyMs = 20) {
      return resolveAfterDelay(filterProducts(query), signal, latencyMs)
    },
  }
}

function filterProducts(query: string): readonly CatalogProduct[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery.length === 0) {
    return sellerHubProducts
  }

  return sellerHubProducts.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery),
  )
}

function resolveAfterDelay<TValue>(
  value: TValue,
  signal: AbortSignal,
  latencyMs: number,
): Promise<TValue> {
  return new Promise<TValue>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('The operation was aborted', 'AbortError'))
      return
    }

    const timeoutId = window.setTimeout(() => {
      resolve(value)
    }, latencyMs)

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('The operation was aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}
