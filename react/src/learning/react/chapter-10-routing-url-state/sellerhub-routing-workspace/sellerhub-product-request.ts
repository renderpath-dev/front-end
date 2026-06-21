import { sellerHubProducts } from './sellerhub-catalog-data'

export function requestSellerHubProduct(productId: string, signal: AbortSignal): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const timerId = window.setTimeout(() => {
      const product = sellerHubProducts.find((candidate) => candidate.id === productId)
      resolve(product ?? { error: 'Product not found' })
    }, productId === 'lamp-101' ? 650 : 350)

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timerId)
        reject(new DOMException('Request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}
