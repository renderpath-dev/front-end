import { z } from "zod";

export const noteStatusSchema = z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]);

export const noteParamsSchema = z.object({
  notebookId: z.string().uuid(),
  noteId: z.string().uuid()
});

export const noteIdParamsSchema = z.object({
  noteId: z.string().uuid()
});

export const notebookOnlyParamsSchema = z.object({
  notebookId: z.string().uuid()
});

export const listNotesQuerySchema = z.object({
  status: noteStatusSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0)
});

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().max(10000).default(""),
  status: noteStatusSchema.default("ACTIVE")
});

export const updateNoteSchema = createNoteSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required."
});
