// Goal:
// Build a small Node.js HTTP server with file storage.

import { createServer } from 'node:http';
import { appendLogRecord, createLogReadStream } from './storage/logStore.js';
import { sendJson } from './http/sendJson.js';

async function readRequestBody(request) {
  const dataChunks = [];

  for await (const dataChunk of request) {
    dataChunks.push(dataChunk);
  }

  return Buffer.concat(dataChunks).toString('utf8');
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/health') {
      sendJson(response, 200, { status: 'ok' });
      return;
    }

    if (request.method === 'POST' && request.url === '/log') {
      const requestBodyText = await readRequestBody(request);
      await appendLogRecord(requestBodyText);
      sendJson(response, 201, { stored: true });
      return;
    }

    if (request.method === 'GET' && request.url === '/logs') {
      response.writeHead(200, { 'content-type': 'text/plain' });
      createLogReadStream().pipe(response);
      return;
    }

    sendJson(response, 404, { error: 'not-found' });
  } catch (serverError) {
    sendJson(response, 500, { error: serverError.message });
  }
});

server.listen(3000, () => {
  console.log('server-ready:http://localhost:3000');
});
