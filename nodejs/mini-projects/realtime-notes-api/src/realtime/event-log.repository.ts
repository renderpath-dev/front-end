import { Prisma, type RealtimeEvent, type RealtimeEventType, type RealtimeResourceType } from "../generated/prisma/client.js";
import { prisma } from "../db/prisma.js";
import type { StoredRealtimeEvent } from "./events.js";

export type CreateRealtimeEventInput = {
  ownerId: string;
  resourceType: RealtimeResourceType;
  resourceId: string;
  eventType: RealtimeEventType;
  payload: Prisma.InputJsonValue;
};

function toStoredRealtimeEvent(event: RealtimeEvent): StoredRealtimeEvent {
  return {
    id: event.id,
    sequence: event.sequence.toString(),
    ownerId: event.ownerId,
    resourceType: event.resourceType,
    resourceId: event.resourceId,
    eventType: event.eventType,
    payload: event.payload,
    createdAt: event.createdAt.toISOString()
  };
}

export async function appendRealtimeEvent(input: CreateRealtimeEventInput): Promise<StoredRealtimeEvent> {
  const event = await prisma.realtimeEvent.create({ data: input });
  return toStoredRealtimeEvent(event);
}

export async function findEventsAfter(input: {
  ownerId: string;
  afterSequence?: string;
  resourceType?: RealtimeResourceType;
  resourceId?: string;
  limit: number;
}): Promise<StoredRealtimeEvent[]> {
  const events = await prisma.realtimeEvent.findMany({
    where: {
      ownerId: input.ownerId,
      sequence: input.afterSequence ? { gt: BigInt(input.afterSequence) } : undefined,
      resourceType: input.resourceType,
      resourceId: input.resourceId
    },
    orderBy: { sequence: "asc" },
    take: input.limit
  });

  return events.map(toStoredRealtimeEvent);
}
