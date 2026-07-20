import { z } from "zod";

const requestIdSchema = z.string().uuid();
const noteIdSchema = z.string().uuid();

export const websocketClientMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("subscribe.note"),
    requestId: requestIdSchema,
    noteId: noteIdSchema
  }),
  z.object({
    type: z.literal("unsubscribe.note"),
    requestId: requestIdSchema,
    noteId: noteIdSchema
  }),
  z.object({
    type: z.literal("presence.note"),
    requestId: requestIdSchema,
    noteId: noteIdSchema,
    cursor: z.object({
      line: z.number().int().nonnegative(),
      column: z.number().int().nonnegative()
    })
  })
]);

export type WebSocketClientMessage = z.infer<typeof websocketClientMessageSchema>;
