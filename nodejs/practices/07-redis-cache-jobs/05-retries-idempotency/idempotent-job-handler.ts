type ExportStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

const statusRows = new Map<string, ExportStatus>();

async function handleExport(exportId: string): Promise<ExportStatus> {
  const current = statusRows.get(exportId);
  if (current === "COMPLETED") {
    return current;
  }

  statusRows.set(exportId, "PROCESSING");
  statusRows.set(exportId, "COMPLETED");
  return "COMPLETED";
}

console.log(await handleExport("export_123"));
console.log(await handleExport("export_123"));
