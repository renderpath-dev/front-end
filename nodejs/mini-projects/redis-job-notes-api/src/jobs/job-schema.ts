import { z } from "zod";

export const exportJobPayloadSchema = z.object({
  exportId: z.string().uuid(),
  ownerId: z.string().uuid(),
  requestedNotebookId: z.string().uuid().optional(),
  format: z.enum(["JSON", "CSV"])
});

export type ExportNotesJobPayload = z.infer<typeof exportJobPayloadSchema>;

export function parseExportJobPayload(data: unknown): ExportNotesJobPayload {
  return exportJobPayloadSchema.parse(data);
}
