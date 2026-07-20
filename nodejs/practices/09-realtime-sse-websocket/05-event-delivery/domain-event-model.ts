type DomainEvent =
  | { type: "NOTE_CREATED"; noteId: string; ownerId: string; title: string }
  | { type: "NOTE_UPDATED"; noteId: string; ownerId: string; updatedAt: string }
  | { type: "NOTE_DELETED"; noteId: string; ownerId: string; deletedAt: string };

type TransportMessage = {
  type: "note.created" | "note.updated" | "note.deleted";
  eventId: string;
  payload: DomainEvent;
};

function toTransportMessage(eventId: string, event: DomainEvent): TransportMessage {
  const type = event.type.toLowerCase().replace("_", ".") as TransportMessage["type"];
  return { type, eventId, payload: event };
}

console.log(toTransportMessage("1", { type: "NOTE_UPDATED", noteId: "n1", ownerId: "u1", updatedAt: new Date().toISOString() }));
