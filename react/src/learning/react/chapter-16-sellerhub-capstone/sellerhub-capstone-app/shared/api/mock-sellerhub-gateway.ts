import type {
  CheckoutResultDto,
  OrderDto,
  OrderListDto,
  OrderStatusDto,
  ProductDto,
  ProductListDto,
} from './sellerhub-dto-contract'

export type CheckoutCommand = {
  email: string
  shippingAddress: string
  totalInCents: number
}

const products: ProductDto[] = [
  {
    id: 'product-lamp',
    name: 'Focus Desk Lamp',
    description: 'A compact task light for focused seller operations.',
    priceInCents: 4599,
    inventoryCount: 12,
    status: 'ACTIVE',
  },
  {
    id: 'product-shelf',
    name: 'Archive Shelf',
    description: 'A retired storage unit kept for lifecycle demonstrations.',
    priceInCents: 12900,
    inventoryCount: 0,
    status: 'ARCHIVED',
  },
  {
    id: 'product-desk',
    name: 'Seller Work Desk',
    description: 'A durable workspace for catalog and order operations.',
    priceInCents: 32900,
    inventoryCount: 5,
    status: 'ACTIVE',
  },
]

let orders: OrderDto[] = [
  {
    id: 'order-1042',
    customerName: 'Avery Stone',
    totalInCents: 4599,
    status: 'PAID',
  },
  {
    id: 'order-1043',
    customerName: 'Jordan Lee',
    totalInCents: 32900,
    status: 'PACKING',
  },
]

function wait(duration = 25): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

async function listProducts(): Promise<unknown> {
  await wait()
  const response: ProductListDto = { items: products.map((product) => ({ ...product })) }
  return response
}

async function getProduct(productId: string): Promise<unknown> {
  await wait()

  if (productId === 'service-error') {
    throw { status: 503, code: 'SERVICE_UNAVAILABLE', message: 'Catalog unavailable' }
  }

  const product = products.find((candidate) => candidate.id === productId)

  if (!product) {
    throw { status: 404, code: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
  }

  return { ...product }
}

async function submitCheckout(command: CheckoutCommand): Promise<unknown> {
  await wait()

  if (command.email.toLowerCase() === 'blocked@example.com') {
    throw { status: 409, code: 'CHECKOUT_BLOCKED', message: 'Checkout requires review' }
  }

  const response: CheckoutResultDto = {
    orderId: `order-${orders.length + 1044}`,
    acceptedAt: new Date('2026-06-28T09:00:00.000Z').toISOString(),
  }

  return response
}

async function listOrders(): Promise<unknown> {
  await wait()
  const response: OrderListDto = { items: orders.map((order) => ({ ...order })) }
  return response
}

async function updateOrderStatus(
  orderId: string,
  status: OrderStatusDto,
): Promise<unknown> {
  await wait()

  if (orderId === 'order-failure') {
    throw { status: 409, code: 'ORDER_CONFLICT', message: 'Order changed elsewhere' }
  }

  const order = orders.find((candidate) => candidate.id === orderId)

  if (!order) {
    throw { status: 404, code: 'ORDER_NOT_FOUND', message: 'Order not found' }
  }

  const updatedOrder = { ...order, status }
  orders = orders.map((candidate) => (candidate.id === orderId ? updatedOrder : candidate))
  return { ...updatedOrder }
}

export const mockSellerHubGateway = {
  getProduct,
  listOrders,
  listProducts,
  submitCheckout,
  updateOrderStatus,
}
