import { z } from "zod";

const clientMessageSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("subscribe.note"), requestId: z.string().uuid(), noteId: z.string().uuid() }),
  z.object({ type: z.literal("unsubscribe.note"), requestId: z.string().uuid(), noteId: z.string().uuid() })
]);

const parsed = clientMessageSchema.safeParse({
  type: "subscribe.note",
  requestId: "00000000-0000-4000-8000-000000000001",
  noteId: "00000000-0000-4000-8000-000000000002"
});

console.log(parsed.success);
