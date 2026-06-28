import { delay, http, HttpResponse } from 'msw'
import type { SellerOrder } from './sellerhub-testing-types'

const sellerOrders: SellerOrder[] = [
  { id: 'order-3001', customer: 'Mina', status: 'open', total: 240 },
  { id: 'order-3002', customer: 'Noah', status: 'shipped', total: 125 },
]

export const sellerHubTestHandlers = [
  http.get('/api/seller/orders', async () => {
    await delay(50)
    return HttpResponse.json(sellerOrders)
  }),
]
