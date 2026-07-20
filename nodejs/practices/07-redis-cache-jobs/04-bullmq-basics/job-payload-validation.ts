import { z } from "zod";

const exportJobSchema = z.object({
  exportId: z.string().uuid(),
  ownerId: z.string().uuid(),
  notebookId: z.string().uuid().optional(),
  format: z.enum(["JSON", "CSV"])
});

export function parseExportJob(data: unknown) {
  return exportJobSchema.parse(data);
}

console.log(parseExportJob({
  exportId: "00000000-0000-4000-8000-000000000001",
  ownerId: "00000000-0000-4000-8000-000000000002",
  format: "JSON"
}));
