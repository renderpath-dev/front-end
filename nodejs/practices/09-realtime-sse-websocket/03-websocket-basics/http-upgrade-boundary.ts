import { createServer } from "node:http";

const server = createServer();

server.on("request", (_request, response) => {
  response.writeHead(404).end();
});

server.on("upgrade", (request, socket) => {
  console.log(`upgrade requested for ${request.url}`);
  socket.write("HTTP/1.1 426 Upgrade Required\r\nConnection: close\r\n\r\n");
  socket.destroy();
});

server.listen(0, () => {
  console.log(server.address());
  server.close();
});
