import { z } from "zod";
import { orderStatusSchema } from "./orderValidator";
import { createProductPayloadSchema } from "./productValidator";
import { createUserPayloadSchema } from "./userValidator";

export const productFormPayloadSchema = createProductPayloadSchema;
export const userFormPayloadSchema = createUserPayloadSchema;

export const orderStatusFormPayloadSchema = z
  .object({
    orderId: z.string().min(1),
    status: orderStatusSchema,
  })
  .strict();
