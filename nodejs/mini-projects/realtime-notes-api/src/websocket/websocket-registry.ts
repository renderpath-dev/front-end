import WebSocket from "ws";
import { config } from "../config/env.js";
import type { AuthContext } from "../shared/auth/auth-context.js";
import type { StoredRealtimeEvent } from "../realtime/events.js";
import { toClientRealtimeEvent } from "../realtime/events.js";
import { sendJsonWithBackpressure } from "./websocket-send.js";

export type WebSocketConnection = {
  connectionId: string;
  userId: string;
  sessionId: string;
  socket: WebSocket;
  subscribedNoteIds: Set<string>;
  isAlive: boolean;
};

export class WebSocketRegistry {
  private readonly connections = new Map<string, WebSocketConnection>();

  add(connectionId: string, auth: AuthContext, socket: WebSocket): WebSocketConnection {
    const connection: WebSocketConnection = {
      connectionId,
      userId: auth.userId,
      sessionId: auth.sessionId,
      socket,
      subscribedNoteIds: new Set(),
      isAlive: true
    };
    this.connections.set(connectionId, connection);
    return connection;
  }

  get(connectionId: string): WebSocketConnection | undefined {
    return this.connections.get(connectionId);
  }

  remove(connectionId: string): void {
    this.connections.delete(connectionId);
  }

  markAlive(connectionId: string): void {
    const connection = this.connections.get(connectionId);
    if (connection) connection.isAlive = true;
  }

  subscribeNote(connectionId: string, noteId: string): void {
    this.connections.get(connectionId)?.subscribedNoteIds.add(noteId);
  }

  unsubscribeNote(connectionId: string, noteId: string): void {
    this.connections.get(connectionId)?.subscribedNoteIds.delete(noteId);
  }

  entries(): Iterable<WebSocketConnection> {
    return this.connections.values();
  }

  sendToUser(userId: string, event: StoredRealtimeEvent): void {
    for (const connection of this.connections.values()) {
      if (connection.userId === userId) {
        sendJsonWithBackpressure(connection.socket, toClientRealtimeEvent(event), config.WS_BACKPRESSURE_LIMIT_BYTES);
      }
    }
  }

  sendToNote(noteId: string, event: StoredRealtimeEvent): void {
    for (const connection of this.connections.values()) {
      if (connection.subscribedNoteIds.has(noteId)) {
        sendJsonWithBackpressure(connection.socket, toClientRealtimeEvent(event), config.WS_BACKPRESSURE_LIMIT_BYTES);
      }
    }
  }

  sendMessageToNote(noteId: string, message: unknown): void {
    for (const connection of this.connections.values()) {
      if (connection.subscribedNoteIds.has(noteId)) {
        sendJsonWithBackpressure(connection.socket, message, config.WS_BACKPRESSURE_LIMIT_BYTES);
      }
    }
  }

  closeAll(code: number, reason: string): void {
    for (const connection of this.connections.values()) {
      connection.socket.close(code, reason);
    }
    this.connections.clear();
  }

  size(): number {
    return this.connections.size;
  }
}

export const websocketRegistry = new WebSocketRegistry();
