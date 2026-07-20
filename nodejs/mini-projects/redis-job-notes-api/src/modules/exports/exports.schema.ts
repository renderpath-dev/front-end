import { z } from "zod";

export const createExportSchema = z.object({
  notebookId: z.string().uuid().optional(),
  format: z.enum(["JSON", "CSV"]).default("JSON")
});

export const exportParamsSchema = z.object({
  exportId: z.string().uuid()
});
