// Goal:
// Send multiple pieces of data over one TCP socket.

import net from 'node:net';

const client = net.createConnection({ port: 4000 }, () => {
  client.write('first');
  client.write('second');
  client.write('third\n');
});

/**
 * @param {Buffer} dataChunk
 */
function handleData(dataChunk) {
  console.log(dataChunk.toString('utf8'));
  client.end();
}

client.on('data', handleData);
