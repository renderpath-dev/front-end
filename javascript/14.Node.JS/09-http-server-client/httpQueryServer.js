// Goal:
// Read pathname and query parameters from a Node.js HTTP request.

import { createServer } from 'node:http';

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url, 'http://localhost:3000');

  if (request.method === 'GET' && requestUrl.pathname === '/search') {
    const keyword = requestUrl.searchParams.get('keyword') ?? '';

    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ keyword }));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ error: 'not-found' }));
});

server.listen(3000, () => {
  console.log('server-ready:http://localhost:3000');
});
