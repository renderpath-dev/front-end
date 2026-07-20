import type { Server } from "node:http";
import type { Duplex } from "node:stream";
import { authenticateWebSocketRequest } from "./websocket-auth.js";
import { isAllowedWebSocketOrigin } from "./websocket-origin.js";
import type { RealtimeWebSocketServer } from "./websocket-server.js";

export type WebSocketUpgradeController = {
  stopAccepting: () => void;
};

function rejectUpgrade(socket: Duplex, statusCode: number, reasonPhrase: string): void {
  socket.write(`HTTP/1.1 ${statusCode} ${reasonPhrase}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`);
  socket.destroy();
}

export function installWebSocketUpgrade(server: Server, realtimeServer: RealtimeWebSocketServer): WebSocketUpgradeController {
  let accepting = true;

  server.on("upgrade", async (request, socket, head) => {
    if (!accepting) {
      rejectUpgrade(socket, 503, "Service Unavailable");
      return;
    }

    const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
    if (pathname !== "/ws") {
      rejectUpgrade(socket, 404, "Not Found");
      return;
    }

    if (!isAllowedWebSocketOrigin(request.headers.origin)) {
      rejectUpgrade(socket, 403, "Forbidden");
      return;
    }

    const auth = await authenticateWebSocketRequest(request);
    if (!auth) {
      rejectUpgrade(socket, 401, "Unauthorized");
      return;
    }

    realtimeServer.handleUpgrade(request, socket, head, auth);
  });

  return {
    stopAccepting: () => {
      accepting = false;
    }
  };
}
