// Goal:
// Pass command arguments as an array.

import { spawn } from 'node:child_process';

const childProcess = spawn(process.execPath, ['-e', 'console.log(1 + 2)']);

childProcess.stdout.on('data', (outputChunk) => {
  console.log(outputChunk.toString('utf8').trim());
});
