export type PerformanceProduct = {
  id: string
  name: string
  category: 'lighting' | 'office'
  price: number
  inventory: number
}

export type PerformanceOrder = {
  id: string
  customer: string
  status: 'pending' | 'shipped'
  total: number
}

export const performanceProducts: PerformanceProduct[] = Array.from(
  { length: 80 },
  (_, index) => ({
    id: `product-${String(index + 1).padStart(3, '0')}`,
    name: `${index % 2 === 0 ? 'Studio Light' : 'Task Chair'} ${index + 1}`,
    category: index % 2 === 0 ? 'lighting' : 'office',
    price: 60 + ((index * 29) % 240),
    inventory: 3 + ((index * 11) % 40),
  }),
)

export const performanceOrders: PerformanceOrder[] = Array.from(
  { length: 60 },
  (_, index) => ({
    id: `order-${String(index + 1).padStart(3, '0')}`,
    customer: `Customer ${index + 1}`,
    status: index % 3 === 0 ? 'pending' : 'shipped',
    total: 75 + ((index * 47) % 500),
  }),
)
