import { RealtimeEventType, RealtimeResourceType, type Prisma } from "../generated/prisma/client.js";
import { publishEventNotification } from "../redis/redis-pubsub.js";
import { sseRegistry } from "../sse/sse-registry.js";
import { websocketRegistry } from "../websocket/websocket-registry.js";
import { appendRealtimeEvent } from "./event-log.repository.js";
import type { StoredRealtimeEvent } from "./events.js";

export async function recordAndPublishNoteEvent(input: {
  ownerId: string;
  noteId: string;
  eventType: typeof RealtimeEventType.NOTE_CREATED | typeof RealtimeEventType.NOTE_UPDATED | typeof RealtimeEventType.NOTE_DELETED;
  payload: Prisma.InputJsonValue;
}): Promise<StoredRealtimeEvent> {
  const event = await appendRealtimeEvent({
    ownerId: input.ownerId,
    resourceType: RealtimeResourceType.NOTE,
    resourceId: input.noteId,
    eventType: input.eventType,
    payload: input.payload
  });

  deliverRealtimeEvent(event);
  await publishEventNotification(event);
  return event;
}

export function deliverRealtimeEvent(event: StoredRealtimeEvent): void {
  sseRegistry.sendToUser(event.ownerId, event);
  websocketRegistry.sendToUser(event.ownerId, event);

  if (event.resourceType === RealtimeResourceType.NOTE) {
    sseRegistry.sendToNote(event.resourceId, event);
    websocketRegistry.sendToNote(event.resourceId, event);
  }
}
