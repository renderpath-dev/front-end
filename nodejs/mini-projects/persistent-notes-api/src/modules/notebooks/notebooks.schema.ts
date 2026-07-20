import { z } from "zod";

export const notebookIdParamsSchema = z.object({
  notebookId: z.string().uuid()
});

export const createNotebookSchema = z.object({
  name: z.string().trim().min(1).max(120)
});

export const updateNotebookSchema = z.object({
  name: z.string().trim().min(1).max(120).optional()
}).refine((value) => value.name !== undefined, {
  message: "At least one field is required"
});
