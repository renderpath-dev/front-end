// Goal:
// Write multiple chunks into a writable stream.

import { createWriteStream } from 'node:fs';

const writeStream = createWriteStream('stream-output.txt', {
  encoding: 'utf8',
});

writeStream.write('alpha\n');
writeStream.write('beta\n');
writeStream.end('gamma\n');

writeStream.on('finish', () => {
  console.log('write-complete');
});

writeStream.on('error', (streamError) => {
  console.error(streamError.message);
});
