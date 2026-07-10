import { z } from "zod";
import { paginationMetaSchema } from "./paginationValidator";

export const apiErrorEnvelopeSchema = z
  .object({
    error: z
      .object({
        code: z.string().min(1),
        message: z.string().min(1),
        fieldErrors: z
          .record(z.string(), z.array(z.string()))
          .optional(),
      })
      .strict(),
    requestId: z.string().min(1),
  })
  .strict();

export function createApiSuccessEnvelopeSchema<Schema extends z.ZodType>(
  valueSchema: Schema,
) {
  return z
    .object({
      data: valueSchema,
      requestId: z.string().min(1),
    })
    .strict();
}

export function createApiListEnvelopeSchema<Schema extends z.ZodType>(
  itemSchema: Schema,
) {
  return z
    .object({
      data: z.array(itemSchema),
      meta: paginationMetaSchema,
      requestId: z.string().min(1),
    })
    .strict();
}

export function createApiMutationEnvelopeSchema<Schema extends z.ZodType>(
  valueSchema: Schema,
) {
  return z
    .object({
      data: valueSchema,
      message: z.string().min(1),
      requestId: z.string().min(1),
    })
    .strict();
}
