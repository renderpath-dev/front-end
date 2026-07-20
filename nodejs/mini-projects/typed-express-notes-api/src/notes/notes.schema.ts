import { z } from "zod";

export const noteIdParamsSchema = z.object({
  id: z.uuid()
});

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(120),
  content: z.string().trim().max(5000)
});

export const updateNoteSchema = createNoteSchema
  .partial()
  .refine((value) => value.title !== undefined || value.content !== undefined, {
    message: "At least one field must be provided."
  });

export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
