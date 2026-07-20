import { RealtimeResourceType } from "../generated/prisma/client.js";
import { findEventsAfter } from "./event-log.repository.js";
import type { StoredRealtimeEvent } from "./events.js";

export function parseLastEventId(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return undefined;
  return trimmed;
}

export function isReplaySequence(value: string | undefined): value is string {
  return value !== undefined && /^\d+$/.test(value);
}

export async function loadUserReplayEvents(ownerId: string, lastEventId: string | undefined): Promise<StoredRealtimeEvent[]> {
  return findEventsAfter({
    ownerId,
    afterSequence: parseLastEventId(lastEventId),
    limit: 100
  });
}

export async function loadNoteReplayEvents(ownerId: string, noteId: string, lastEventId: string | undefined): Promise<StoredRealtimeEvent[]> {
  return findEventsAfter({
    ownerId,
    afterSequence: parseLastEventId(lastEventId),
    resourceType: RealtimeResourceType.NOTE,
    resourceId: noteId,
    limit: 100
  });
}
