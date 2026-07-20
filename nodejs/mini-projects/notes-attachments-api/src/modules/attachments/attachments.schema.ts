import { z } from "zod";

export const noteAttachmentParamsSchema = z.object({
  noteId: z.string().uuid()
});

export const attachmentParamsSchema = z.object({
  attachmentId: z.string().uuid()
});
