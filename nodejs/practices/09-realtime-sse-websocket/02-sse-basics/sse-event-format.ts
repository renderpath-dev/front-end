type SseEvent = {
  id?: string;
  event?: string;
  retry?: number;
  data: unknown;
};

function formatSseEvent(input: SseEvent): string {
  const lines: string[] = [];
  if (input.id) lines.push(`id: ${input.id}`);
  if (input.event) lines.push(`event: ${input.event}`);
  if (input.retry !== undefined) lines.push(`retry: ${input.retry}`);

  const serialized = typeof input.data === "string" ? input.data : JSON.stringify(input.data);
  for (const line of serialized.split(/\r?\n/)) {
    lines.push(`data: ${line}`);
  }

  lines.push("");
  return lines.join("\n");
}

console.log(formatSseEvent({ id: "123", event: "note.updated", data: { noteId: "n1" } }));
