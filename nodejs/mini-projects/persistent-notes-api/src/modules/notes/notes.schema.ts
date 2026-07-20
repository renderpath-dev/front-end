import { z } from "zod";

export const noteIdParamsSchema = z.object({
  noteId: z.string().uuid()
});

export const listNotesQuerySchema = z.object({
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  order: z.enum(["asc", "desc"]).default("desc")
}).transform((query) => ({
  status: query.status,
  take: query.limit,
  skip: query.offset,
  order: query.order
}));

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().max(5000).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("ACTIVE")
});

export const updateNoteSchema = z.object({
  title: z.string().trim().min(1).max(160).optional(),
  body: z.string().trim().max(5000).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional()
}).refine((value) => value.title !== undefined || value.body !== undefined || value.status !== undefined, {
  message: "At least one field is required"
});
