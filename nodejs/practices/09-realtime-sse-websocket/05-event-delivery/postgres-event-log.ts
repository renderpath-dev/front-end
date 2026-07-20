type StoredEvent = {
  sequence: bigint;
  ownerId: string;
  eventType: "NOTE_CREATED" | "NOTE_UPDATED" | "NOTE_DELETED";
  payload: unknown;
};

const eventLog: StoredEvent[] = [];

function appendEvent(event: Omit<StoredEvent, "sequence">): StoredEvent {
  const stored = { ...event, sequence: BigInt(eventLog.length + 1) };
  eventLog.push(stored);
  return stored;
}

function replayAfter(ownerId: string, sequence: bigint): StoredEvent[] {
  return eventLog.filter((event) => event.ownerId === ownerId && event.sequence > sequence);
}

appendEvent({ ownerId: "u1", eventType: "NOTE_UPDATED", payload: { noteId: "n1" } });
console.log(replayAfter("u1", 0n).length);
