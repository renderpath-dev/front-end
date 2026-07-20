type Connection = {
  connectionId: string;
  userId: string;
  noteIds: Set<string>;
};

const registry = new Map<string, Connection>();

function addConnection(connection: Connection): void {
  registry.set(connection.connectionId, connection);
}

function removeConnection(connectionId: string): void {
  registry.delete(connectionId);
}

addConnection({ connectionId: "c1", userId: "u1", noteIds: new Set() });
removeConnection("c1");
console.log(registry.size);
