'use strict';

const fs = require('node:fs');
const http = require('node:http');
const { performance } = require('node:perf_hooks');

const responseOrder = [];

const server = http.createServer((request, response) => {
  if (request.url === '/io') {
    fs.readFile(__filename, 'utf8', (error, source) => {
      if (error) {
        response.writeHead(500).end('Read failed');
        return;
      }

      setTimeout(() => {
        responseOrder.push('io');
        response.end(`Read ${Buffer.byteLength(source)} bytes`);
      }, 80);
    });
    return;
  }

  if (request.url === '/fast') {
    responseOrder.push('fast');
    response.end('Fast response');
    return;
  }

  response.writeHead(404).end('Not found');
});

server.listen(0, '127.0.0.1', () => {
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;
  const start = performance.now();
  let completedRequests = 0;

  function finishRequest(label) {
    return (response) => {
      response.resume();
      response.on('end', () => {
        completedRequests += 1;
        console.log(`${label} completed after ${(performance.now() - start).toFixed(1)} ms`);

        if (completedRequests === 2) {
          console.log('Server response order:', responseOrder);
          server.close();
        }
      });
    };
  }

  console.log(`Listening on ${origin}`);
  http.get(`${origin}/io`, finishRequest('I/O request'));
  http.get(`${origin}/fast`, finishRequest('Fast request'));
});
