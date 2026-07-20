import { EventEmitter } from "node:events";

type Connection = {
  id: string;
  heartbeat: NodeJS.Timeout;
};

const activeConnections = new Map<string, Connection>();
const request = new EventEmitter();

function register(connection: Connection): void {
  activeConnections.set(connection.id, connection);
  request.once("close", () => {
    clearInterval(connection.heartbeat);
    activeConnections.delete(connection.id);
  });
}

register({ id: "conn-1", heartbeat: setInterval(() => undefined, 1000) });
request.emit("close");
console.log(activeConnections.size);
