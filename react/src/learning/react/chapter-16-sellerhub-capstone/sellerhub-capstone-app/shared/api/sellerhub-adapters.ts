import type {
  OrderDto,
  OrderStatusDto,
  ProductDto,
  ProductStatusDto,
} from './sellerhub-dto-contract'

export type ProductStatus = 'active' | 'archived'

export type ProductViewModel = {
  id: string
  name: string
  description: string
  unitPriceInCents: number
  inventoryLabel: string
  status: ProductStatus
}

export type OrderStatus = 'paid' | 'packing' | 'shipped'

export type OrderViewModel = {
  id: string
  customerName: string
  totalInCents: number
  status: OrderStatus
}

const productStatusMap: Record<ProductStatusDto, ProductStatus> = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
}

const orderStatusMap: Record<OrderStatusDto, OrderStatus> = {
  PAID: 'paid',
  PACKING: 'packing',
  SHIPPED: 'shipped',
}

export function adaptProductDto(dto: ProductDto): ProductViewModel {
  return {
    id: dto.id,
    name: dto.name.trim(),
    description: dto.description.trim(),
    unitPriceInCents: dto.priceInCents,
    inventoryLabel:
      dto.inventoryCount === 0 ? 'Out of stock' : `${dto.inventoryCount} available`,
    status: productStatusMap[dto.status],
  }
}

export function adaptOrderDto(dto: OrderDto): OrderViewModel {
  return {
    id: dto.id,
    customerName: dto.customerName.trim(),
    totalInCents: dto.totalInCents,
    status: orderStatusMap[dto.status],
  }
}

export function toOrderStatusDto(status: OrderStatus): OrderStatusDto {
  const statusMap: Record<OrderStatus, OrderStatusDto> = {
    paid: 'PAID',
    packing: 'PACKING',
    shipped: 'SHIPPED',
  }

  return statusMap[status]
}
