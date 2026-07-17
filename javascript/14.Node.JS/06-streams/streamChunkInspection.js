// Goal:
// Inspect chunks from a readable file stream

import {createReadStream} from 'node:fs';

const readStream = createReadStream('input.txt',{ encoding: 'utf8' });

readStream.on('data', (textChunk) => {
  console.log(`chunk:${JSON.stringify(textChunk)}`);
});

readStream.on('end', () => {
  console.log('read-completed');
});

readStream.on('error',(streamError) => {
  console.error(streamError.message);
})
