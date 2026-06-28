import {
  adaptOrderDto,
  toOrderStatusDto,
} from '../../shared/api/sellerhub-adapters'
import type {
  OrderStatus,
  OrderViewModel,
} from '../../shared/api/sellerhub-adapters'
import {
  assertOrderDto,
  assertOrderListDto,
} from '../../shared/api/sellerhub-dto-contract'
import { mockSellerHubGateway } from '../../shared/api/mock-sellerhub-gateway'

export async function loadSellerOrders(): Promise<OrderViewModel[]> {
  const response = await mockSellerHubGateway.listOrders()
  assertOrderListDto(response)
  return response.items.map(adaptOrderDto)
}

export async function changeSellerOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<OrderViewModel> {
  const response = await mockSellerHubGateway.updateOrderStatus(
    orderId,
    toOrderStatusDto(status),
  )
  assertOrderDto(response)
  return adaptOrderDto(response)
}
