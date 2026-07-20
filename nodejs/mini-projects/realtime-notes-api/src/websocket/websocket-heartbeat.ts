import type { WebSocketRegistry } from "./websocket-registry.js";

export function startWebSocketHeartbeat(registry: WebSocketRegistry, intervalMs: number): () => void {
  const timer = setInterval(() => {
    for (const connection of registry.entries()) {
      if (!connection.isAlive) {
        connection.socket.terminate();
        registry.remove(connection.connectionId);
        continue;
      }

      connection.isAlive = false;
      connection.socket.ping();
    }
  }, intervalMs);

  return () => clearInterval(timer);
}
