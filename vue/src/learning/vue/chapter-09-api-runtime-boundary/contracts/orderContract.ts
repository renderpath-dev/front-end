import type { ApiListEnvelope } from "./apiEnvelopeContract";
import type { PaginationQuery } from "./paginationContract";

export type OrderDto = {
  id: string;
  customer_name: string;
  total_amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  created_at: string;
};

export type Order = {
  id: string;
  customer: string;
  total: number;
  status: OrderDto["status"];
  createdAt: string;
};

export type OrderListQuery = PaginationQuery & {
  status: Order["status"] | "";
};

export type UpdateOrderStatusPayload = {
  status: Order["status"];
};

export type OrderListResponse = ApiListEnvelope<OrderDto>;
