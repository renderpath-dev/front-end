import WebSocket from "ws";
import { websocketCloseCodes } from "./websocket-close.js";

export type WebSocketSendResult = "sent" | "closed" | "backpressure";

export function sendJsonWithBackpressure(socket: WebSocket, payload: unknown, maxBufferedBytes: number): WebSocketSendResult {
  if (socket.readyState !== WebSocket.OPEN) {
    return "closed";
  }

  if (socket.bufferedAmount > maxBufferedBytes) {
    socket.close(websocketCloseCodes.tryAgainLater, "Backpressure limit exceeded");
    return "backpressure";
  }

  socket.send(JSON.stringify(payload));
  return "sent";
}
