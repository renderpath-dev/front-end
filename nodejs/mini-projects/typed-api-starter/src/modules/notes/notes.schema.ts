import { z } from "zod";

export const noteIdParamsSchema = z.object({
  id: z.string().trim().min(1)
});

export const createNoteSchema = z.object({
  title: z.string().trim().min(1),
  body: z.string().trim().optional()
});

export const updateNoteSchema = z.object({
  title: z.string().trim().min(1).optional(),
  body: z.string().trim().optional()
}).refine((value) => value.title !== undefined || value.body !== undefined, {
  message: "At least one field is required"
});
