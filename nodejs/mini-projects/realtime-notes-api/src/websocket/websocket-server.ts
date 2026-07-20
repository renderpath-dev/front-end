import { randomUUID } from "node:crypto";
import type { IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";
import { WebSocketServer } from "ws";
import { config } from "../config/env.js";
import type { AuthContext } from "../shared/auth/auth-context.js";
import { handleWebSocketMessage } from "./websocket-router.js";
import { sendJsonWithBackpressure } from "./websocket-send.js";
import { websocketCloseCodes } from "./websocket-close.js";
import { startWebSocketHeartbeat } from "./websocket-heartbeat.js";
import { websocketRegistry, type WebSocketRegistry } from "./websocket-registry.js";

export class RealtimeWebSocketServer {
  private readonly webSocketServer = new WebSocketServer({
    noServer: true,
    maxPayload: config.WS_MAX_PAYLOAD_BYTES
  });

  private stopHeartbeat: (() => void) | undefined;

  constructor(private readonly registry: WebSocketRegistry = websocketRegistry) {}

  startHeartbeat(): void {
    this.stopHeartbeat = startWebSocketHeartbeat(this.registry, config.HEARTBEAT_INTERVAL_MS);
  }

  handleUpgrade(request: IncomingMessage, socket: Duplex, head: Buffer, auth: AuthContext): void {
    this.webSocketServer.handleUpgrade(request, socket, head, (websocket) => {
      const connectionId = randomUUID();
      this.registry.add(connectionId, auth, websocket);

      websocket.on("message", (raw) => {
        void handleWebSocketMessage(connectionId, raw, this.registry);
      });

      websocket.on("pong", () => {
        this.registry.markAlive(connectionId);
      });

      websocket.on("close", () => {
        this.registry.remove(connectionId);
      });

      sendJsonWithBackpressure(websocket, {
        type: "connection.ready",
        connectionId
      }, config.WS_BACKPRESSURE_LIMIT_BYTES);
    });
  }

  closeAll(reason: string): void {
    this.stopHeartbeat?.();
    this.registry.closeAll(websocketCloseCodes.goingAway, reason);
    this.webSocketServer.close();
  }
}

export function createRealtimeWebSocketServer(): RealtimeWebSocketServer {
  const server = new RealtimeWebSocketServer();
  server.startHeartbeat();
  return server;
}
