'use strict';

const http = require('node:http');
const { performance } = require('node:perf_hooks');

function blockEventLoop(durationMs) {
  const start = performance.now();

  while (performance.now() - start < durationMs) {
    // Intentionally empty.
  }
}

const server = http.createServer((request, response) => {
  if (request.url !== '/block') {
    response.writeHead(404).end('Not found');
    return;
  }

  const requestStart = performance.now();
  const expectedTimerDelayMs = 20;

  setTimeout(() => {
    const actualDelayMs = performance.now() - requestStart;
    console.log(`Timer delay: ${actualDelayMs.toFixed(1)} ms`);
    console.log(
      `Extra delay caused by blocking: ${(actualDelayMs - expectedTimerDelayMs).toFixed(1)} ms`,
    );
    server.close();
  }, expectedTimerDelayMs);

  blockEventLoop(350);
  response.end('Blocking task complete');
});

server.listen(0, '127.0.0.1', () => {
  const address = server.address();
  const url = `http://127.0.0.1:${address.port}/block`;

  console.log(`Listening on ${url}`);

  http.get(url, (response) => {
    response.resume();
    response.on('end', () => {
      console.log('Client received the response');
    });
  });
});
