// Goal:
// Create a TCP echo server.

import net from 'node:net';

const server = net.createServer((socket) => {
  socket.write('ready\n');

  socket.on('data', (dataChunk) => {
    socket.write(`echo:${dataChunk.toString('utf8')}`);
  });
});

server.listen(4000, () => {
  console.log('tcp-server-ready');
});
