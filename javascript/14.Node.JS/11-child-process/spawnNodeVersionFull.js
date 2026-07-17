// Goal:
// Spawn a child process and read stdout, stderr, errors, and exit code.

import { spawn } from 'node:child_process';

const childProcess = spawn(process.execPath, ['--version']);

childProcess.stdout.on('data', (outputChunk) => {
  const outputText = outputChunk.toString('utf8').trim();
  console.log(outputText.startsWith('v'));
});

childProcess.stderr.on('data', (errorChunk) => {
  console.error(errorChunk.toString('utf8').trim());
});

childProcess.on('error', (spawnError) => {
  console.error(spawnError.message);
});

childProcess.on('close', (exitCode, signalName) => {
  console.log(`exit-code:${exitCode}`);
  console.log(`signal:${signalName}`);
});
