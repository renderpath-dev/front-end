// Goal:
// Copy a file with stream and pipeline.

import {createReadStream,createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';

await pipeline(
  createReadStream('input.txt'),
  createWriteStream('output.txt'),
)

console.log('copy completed')