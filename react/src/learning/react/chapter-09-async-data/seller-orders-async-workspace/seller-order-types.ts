export type SellerOrderStatus = 'pending' | 'shipped'

export type SellerOrderCriteria =
  | 'all'
  | SellerOrderStatus
  | 'cancelled'
  | 'request-error'

export type SellerOrder = {
  id: string
  customerName: string
  status: SellerOrderStatus
  total: number
}

export type SellerOrdersState =
  | { status: 'idle'; orders: SellerOrder[] }
  | { status: 'pending'; orders: SellerOrder[] }
  | { status: 'success'; orders: SellerOrder[] }
  | { status: 'empty'; orders: SellerOrder[] }
  | { status: 'error'; orders: SellerOrder[]; message: string }

export type SellerOrdersAction =
  | { type: 'request_started' }
  | { type: 'request_succeeded'; orders: SellerOrder[] }
  | { type: 'request_failed'; message: string }

export type SellerOrdersResource = {
  criteria: SellerOrderCriteria
  state: SellerOrdersState
  setCriteria: (criteria: SellerOrderCriteria) => void
  retry: () => void
}
