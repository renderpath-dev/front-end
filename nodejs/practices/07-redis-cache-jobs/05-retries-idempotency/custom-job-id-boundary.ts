export function toBullMqJobId(exportId: string): string {
  return `export-${exportId.replaceAll("-", "")}`;
}

const jobId = toBullMqJobId("00000000-0000-4000-8000-000000000001");
if (jobId.includes(":")) {
  throw new Error("BullMQ custom job ids must not contain a colon");
}

console.log({ jobId });
