import { createServer } from "node:http";

const server = createServer((request, response) => {
  if (request.url !== "/events") {
    response.writeHead(404).end();
    return;
  }

  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  response.write("event: connection.ready\n");
  response.write('data: {"connectionId":"demo"}\n\n');
});

server.listen(0, () => {
  const address = server.address();
  console.log(address);
  server.close();
});
