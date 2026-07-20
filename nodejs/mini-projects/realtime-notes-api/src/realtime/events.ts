import type { RealtimeEventType, RealtimeResourceType } from "../generated/prisma/client.js";

export type StoredRealtimeEvent = {
  id: string;
  sequence: string;
  ownerId: string;
  resourceType: RealtimeResourceType;
  resourceId: string;
  eventType: RealtimeEventType;
  payload: unknown;
  createdAt: string;
};

export type ClientRealtimeEvent = {
  type: "note.created" | "note.updated" | "note.deleted" | "note.subscribed" | "presence.updated";
  eventId: string;
  sequence: string;
  payload: unknown;
  createdAt: string;
};

const clientEventTypeByStoredType: Record<RealtimeEventType, ClientRealtimeEvent["type"]> = {
  NOTE_CREATED: "note.created",
  NOTE_UPDATED: "note.updated",
  NOTE_DELETED: "note.deleted",
  NOTE_SUBSCRIBED: "note.subscribed",
  PRESENCE_UPDATED: "presence.updated"
};

export function toClientRealtimeEvent(event: StoredRealtimeEvent): ClientRealtimeEvent {
  return {
    type: clientEventTypeByStoredType[event.eventType],
    eventId: event.id,
    sequence: event.sequence,
    payload: event.payload,
    createdAt: event.createdAt
  };
}
