const SAFE_CHANNEL_SEGMENT = /^[a-zA-Z0-9:_-]+$/;

function safeSegment(value: string): string {
  if (!SAFE_CHANNEL_SEGMENT.test(value)) {
    throw new Error("Unsafe Redis channel segment.");
  }

  return value;
}

export function userEventsChannel(userId: string): string {
  return `realtime:user:${safeSegment(userId)}:events`;
}

export function noteEventsChannel(noteId: string): string {
  return `realtime:note:${safeSegment(noteId)}:events`;
}

export const USER_EVENTS_PATTERN = "realtime:user:*:events";
export const NOTE_EVENTS_PATTERN = "realtime:note:*:events";
