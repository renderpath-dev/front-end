// Goal:
// Spawn a child process and read its output.

import { spawn } from 'node:child_process';

const childProcess = spawn(process.execPath, ['--version']);

childProcess.stdout.on('data', (dataChunk) => {
  console.log(dataChunk.toString('utf8').trim().startsWith('v'));
});

childProcess.on('close', (exitCode) => {
  console.log(`exit-code:${exitCode}`);
});
