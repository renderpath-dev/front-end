// Goal:
// Create a TCP echo server with socket error handling.

import net from 'node:net';

const server = net.createServer((socket) => {
  socket.write('ready\n');

  socket.on('data', (dataChunk) => {
    const messageText = dataChunk.toString('utf8').trim();
    socket.write(`echo:${messageText}\n`);
  });

  socket.on('error', (socketError) => {
    console.error(socketError.message);
  });
});

server.on('error', (serverError) => {
  console.error(serverError.message);
});

server.listen(4000, () => {
  console.log('tcp-server-ready');
});
