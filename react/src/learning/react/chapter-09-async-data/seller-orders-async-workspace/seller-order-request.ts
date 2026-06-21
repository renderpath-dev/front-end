import type { SellerOrder, SellerOrderCriteria } from './seller-order-types'

const sellerOrders: SellerOrder[] = [
  { id: 'ORD-2101', customerName: 'Avery Chen', status: 'pending', total: 148 },
  { id: 'ORD-2102', customerName: 'Jordan Lee', status: 'shipped', total: 92 },
  { id: 'ORD-2103', customerName: 'Morgan Diaz', status: 'pending', total: 235 },
]

function waitForRequest(delay: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const handleAbort = () => {
      window.clearTimeout(timeoutId)
      reject(new DOMException('Seller orders request aborted', 'AbortError'))
    }

    const timeoutId = window.setTimeout(() => {
      signal.removeEventListener('abort', handleAbort)
      resolve()
    }, delay)

    signal.addEventListener('abort', handleAbort, { once: true })

    if (signal.aborted) handleAbort()
  })
}

export async function requestSellerOrders(
  criteria: SellerOrderCriteria,
  signal: AbortSignal,
): Promise<unknown> {
  const delay = criteria === 'pending' ? 850 : 400
  await waitForRequest(delay, signal)

  if (criteria === 'request-error') {
    throw new Error('Seller orders service unavailable')
  }

  if (criteria === 'cancelled') {
    return { orders: [] }
  }

  const orders =
    criteria === 'all' ? sellerOrders : sellerOrders.filter((order) => order.status === criteria)

  return { orders }
}
