type RoomName = `user:${string}` | `note:${string}`;

const rooms = new Map<RoomName, Set<string>>();

function joinRoom(room: RoomName, connectionId: string): void {
  const members = rooms.get(room) ?? new Set<string>();
  members.add(connectionId);
  rooms.set(room, members);
}

function leaveRoom(room: RoomName, connectionId: string): void {
  rooms.get(room)?.delete(connectionId);
}

joinRoom("note:note-1", "connection-1");
leaveRoom("note:note-1", "connection-1");
console.log(rooms.get("note:note-1")?.size ?? 0);
