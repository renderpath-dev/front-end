// Goal:
// Read a POST request body from the request stream.

import { createServer } from 'node:http';

async function readRequestBody(request) {
  const bodyChunks = [];

  for await (const bodyChunk of request) {
    bodyChunks.push(bodyChunk);
  }

  return Buffer.concat(bodyChunks).toString('utf8');
}

const server = createServer(async (request, response) => {
  if (request.method === 'POST' && request.url === '/message') {
    const requestBodyText = await readRequestBody(request);

    response.writeHead(201, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ received: requestBodyText }));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ error: 'not-found' }));
});

server.listen(3000, () => {
  console.log('server-ready:http://localhost:3000');
});
