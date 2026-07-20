import { createServer } from "node:http";
import { WebSocketServer } from "ws";

const server = createServer();
const websocketServer = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  if (request.url !== "/ws") {
    socket.destroy();
    return;
  }

  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit("connection", websocket, request);
  });
});

console.log(websocketServer.options.noServer);
server.close();
