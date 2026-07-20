import type { RawData } from "ws";
import { RealtimeEventType, RealtimeResourceType } from "../generated/prisma/client.js";
import { config } from "../config/env.js";
import { findNoteById } from "../modules/notes/notes.repository.js";
import { appendRealtimeEvent } from "../realtime/event-log.repository.js";
import { publishEventNotification } from "../redis/redis-pubsub.js";
import { websocketClientMessageSchema, type WebSocketClientMessage } from "./websocket-message.schema.js";
import type { WebSocketRegistry } from "./websocket-registry.js";
import { sendJsonWithBackpressure } from "./websocket-send.js";
import { websocketCloseCodes } from "./websocket-close.js";

function rawDataToString(raw: RawData): string {
  if (typeof raw === "string") return raw;
  if (raw instanceof Buffer) return raw.toString("utf8");
  if (Array.isArray(raw)) return Buffer.concat(raw).toString("utf8");
  return Buffer.from(new Uint8Array(raw as ArrayBuffer)).toString("utf8");
}

async function ensureOwnedNote(noteId: string, userId: string): Promise<boolean> {
  const note = await findNoteById(noteId);
  return Boolean(note && note.ownerId === userId);
}

async function handleSubscribe(connectionId: string, message: Extract<WebSocketClientMessage, { type: "subscribe.note" }>, registry: WebSocketRegistry): Promise<void> {
  const connection = registry.get(connectionId);
  if (!connection) return;

  if (!(await ensureOwnedNote(message.noteId, connection.userId))) {
    sendJsonWithBackpressure(connection.socket, {
      type: "subscription.rejected",
      requestId: message.requestId,
      code: "OWNER_REQUIRED",
      message: "The note does not belong to the authenticated user."
    }, config.WS_BACKPRESSURE_LIMIT_BYTES);
    return;
  }

  registry.subscribeNote(connectionId, message.noteId);
  const event = await appendRealtimeEvent({
    ownerId: connection.userId,
    resourceType: RealtimeResourceType.NOTE,
    resourceId: message.noteId,
    eventType: RealtimeEventType.NOTE_SUBSCRIBED,
    payload: { noteId: message.noteId }
  });
  await publishEventNotification(event);

  sendJsonWithBackpressure(connection.socket, {
    type: "subscription.accepted",
    requestId: message.requestId,
    noteId: message.noteId
  }, config.WS_BACKPRESSURE_LIMIT_BYTES);
}

async function handleUnsubscribe(connectionId: string, message: Extract<WebSocketClientMessage, { type: "unsubscribe.note" }>, registry: WebSocketRegistry): Promise<void> {
  const connection = registry.get(connectionId);
  if (!connection) return;
  registry.unsubscribeNote(connectionId, message.noteId);
  sendJsonWithBackpressure(connection.socket, {
    type: "subscription.removed",
    requestId: message.requestId,
    noteId: message.noteId
  }, config.WS_BACKPRESSURE_LIMIT_BYTES);
}

async function handlePresence(connectionId: string, message: Extract<WebSocketClientMessage, { type: "presence.note" }>, registry: WebSocketRegistry): Promise<void> {
  const connection = registry.get(connectionId);
  if (!connection) return;

  if (!(await ensureOwnedNote(message.noteId, connection.userId))) {
    sendJsonWithBackpressure(connection.socket, {
      type: "subscription.rejected",
      requestId: message.requestId,
      code: "OWNER_REQUIRED",
      message: "The note does not belong to the authenticated user."
    }, config.WS_BACKPRESSURE_LIMIT_BYTES);
    return;
  }

  registry.sendMessageToNote(message.noteId, {
    type: "presence.note",
    requestId: message.requestId,
    noteId: message.noteId,
    userId: connection.userId,
    cursor: message.cursor
  });
}

export async function handleWebSocketMessage(connectionId: string, raw: RawData, registry: WebSocketRegistry): Promise<void> {
  const connection = registry.get(connectionId);
  if (!connection) return;

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawDataToString(raw));
  } catch {
    sendJsonWithBackpressure(connection.socket, {
      type: "error",
      code: "INVALID_JSON",
      message: "WebSocket messages must be JSON."
    }, config.WS_BACKPRESSURE_LIMIT_BYTES);
    connection.socket.close(websocketCloseCodes.invalidPayload, "Invalid JSON");
    return;
  }

  const parsedMessage = websocketClientMessageSchema.safeParse(parsedJson);
  if (!parsedMessage.success) {
    sendJsonWithBackpressure(connection.socket, {
      type: "error",
      code: "INVALID_MESSAGE",
      message: "WebSocket message schema validation failed."
    }, config.WS_BACKPRESSURE_LIMIT_BYTES);
    return;
  }

  if (parsedMessage.data.type === "subscribe.note") {
    await handleSubscribe(connectionId, parsedMessage.data, registry);
    return;
  }

  if (parsedMessage.data.type === "unsubscribe.note") {
    await handleUnsubscribe(connectionId, parsedMessage.data, registry);
    return;
  }

  await handlePresence(connectionId, parsedMessage.data, registry);
}
