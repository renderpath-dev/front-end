import { z } from "zod";

export const sortOrderSchema = z.enum(["ascending", "descending"]);

export const paginationMetaSchema = z
  .object({
    page: z.number().int().positive(),
    pageSize: z.number().int().positive().max(100),
    total: z.number().int().nonnegative(),
    sort: z.string().min(1),
    order: sortOrderSchema,
  })
  .strict();

export const paginationQuerySchema = paginationMetaSchema
  .omit({ total: true })
  .strict();
