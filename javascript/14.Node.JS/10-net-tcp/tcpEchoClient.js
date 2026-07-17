// Goal:
// Connect to a TCP server and exchange messages.

import net from 'node:net';

const client = net.createConnection({ port: 4000 }, () => {
  client.write('hello\n');
});

client.on('data', (dataChunk) => {
  console.log(dataChunk.toString('utf8').trim());

  if (dataChunk.toString('utf8').includes('echo:')) {
    client.end();
  }
});
