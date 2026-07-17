// Goal:
// Connect to a TCP server and close after receiving an echo.

import net from 'node:net';
import {createConnection} from 'node:net'
const client = net.createConnection({ port: 4000 }, () => {
  const canContinueWriting = client.write('hello\n');
  console.log(`write-buffer-ok:${canContinueWriting}`);
});

client.on('data', (dataChunk) => {
  const responseText = dataChunk.toString('utf8').trim();
  console.log(responseText);

  if (responseText.startsWith('echo:')) {
    client.end();
  }
});

client.on('end', () => {
  console.log('connection-ended');
});

client.on('error', (clientError) => {
  console.error(clientError.message);
});
