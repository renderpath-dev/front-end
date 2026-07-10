import { requestValidated } from "../api/httpClient";
import type { ApiCallOptions, ApiResult } from "../api/httpTypes";
import type {
  Order,
  OrderDto,
  OrderListQuery,
  UpdateOrderStatusPayload,
} from "../contracts/orderContract";
import type { PaginatedResult } from "../contracts/paginationContract";
import {
  orderListResponseSchema,
  orderMutationResponseSchema,
} from "../validators/orderValidator";

function mapOrder(dto: OrderDto): Order {
  return {
    id: dto.id,
    customer: dto.customer_name,
    total: dto.total_amount,
    status: dto.status,
    createdAt: dto.created_at,
  };
}

export async function listOrders(
  query: OrderListQuery,
  options: ApiCallOptions = {},
): Promise<ApiResult<PaginatedResult<Order>>> {
  const result = await requestValidated(orderListResponseSchema, {
    method: "GET",
    url: "/orders",
    params: query,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "orders:list" },
  });
  if (!result.ok) return result;

  const data: PaginatedResult<Order> = {
    rows: result.data.data.map(mapOrder),
    meta: result.data.meta,
  };
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}

export async function updateOrderStatus(
  orderId: string,
  payload: UpdateOrderStatusPayload,
  options: ApiCallOptions = {},
): Promise<ApiResult<Order>> {
  const result = await requestValidated(orderMutationResponseSchema, {
    method: "PATCH",
    url: `/orders/${orderId}/status`,
    body: payload,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "orders:status" },
  });
  if (!result.ok) return result;

  const data = mapOrder(result.data.data);
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}
