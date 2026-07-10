import { z } from "zod";
import {
  createApiListEnvelopeSchema,
  createApiMutationEnvelopeSchema,
} from "./apiEnvelopeValidator";

export const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "completed",
  "cancelled",
]);

export const orderDtoSchema = z
  .object({
    id: z.string().min(1),
    customer_name: z.string().min(1),
    total_amount: z.number().nonnegative(),
    status: orderStatusSchema,
    created_at: z.string().min(1),
  })
  .strict();

export const updateOrderStatusPayloadSchema = z
  .object({
    status: orderStatusSchema,
  })
  .strict();

export const orderListResponseSchema =
  createApiListEnvelopeSchema(orderDtoSchema);

export const orderMutationResponseSchema =
  createApiMutationEnvelopeSchema(orderDtoSchema);
