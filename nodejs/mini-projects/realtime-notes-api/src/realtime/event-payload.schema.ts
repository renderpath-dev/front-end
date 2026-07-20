import { z } from "zod";

export const noteEventPayloadSchema = z.object({
  noteId: z.string().uuid(),
  notebookId: z.string().uuid(),
  title: z.string().min(1).optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional()
});

export const presenceEventPayloadSchema = z.object({
  noteId: z.string().uuid(),
  userId: z.string().uuid(),
  cursor: z.object({
    line: z.number().int().nonnegative(),
    column: z.number().int().nonnegative()
  })
});
