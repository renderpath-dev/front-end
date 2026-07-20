type StoredEvent = {
  sequence: bigint;
  ownerId: string;
  resourceId: string;
};

function replayOwnedEvents(events: StoredEvent[], ownerId: string, after: bigint): StoredEvent[] {
  return events
    .filter((event) => event.ownerId === ownerId)
    .filter((event) => event.sequence > after)
    .sort((left, right) => Number(left.sequence - right.sequence));
}

const replayed = replayOwnedEvents([
  { sequence: 1n, ownerId: "u1", resourceId: "n1" },
  { sequence: 2n, ownerId: "u2", resourceId: "n2" }
], "u1", 0n);

console.log(replayed.map((event) => event.sequence.toString()));
