import { z } from "zod";
import {
  createApiListEnvelopeSchema,
  createApiMutationEnvelopeSchema,
  createApiSuccessEnvelopeSchema,
} from "./apiEnvelopeValidator";

export const productDtoSchema = z
  .object({
    id: z.string().min(1),
    product_name: z.string().min(1),
    category: z.string().min(1),
    unit_price: z.number().nonnegative(),
    stock_count: z.number().int().nonnegative(),
    status: z.enum(["active", "draft"]),
  })
  .strict();

export const productSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: z.string().min(1),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative(),
    status: z.enum(["active", "draft"]),
  })
  .strict();

export const createProductPayloadSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    category: z.string().trim().min(2).max(40),
    price: z.number().positive().max(1_000_000),
    stock: z.number().int().nonnegative().max(1_000_000),
  })
  .strict();

export const updateProductPayloadSchema = createProductPayloadSchema
  .extend({
    status: z.enum(["active", "draft"]),
  })
  .strict();

export const productListResponseSchema =
  createApiListEnvelopeSchema(productDtoSchema);

export const productDetailResponseSchema =
  createApiSuccessEnvelopeSchema(productDtoSchema);

export const productMutationResponseSchema =
  createApiMutationEnvelopeSchema(productDtoSchema);

export type ValidatedProductDto = z.infer<typeof productDtoSchema>;
