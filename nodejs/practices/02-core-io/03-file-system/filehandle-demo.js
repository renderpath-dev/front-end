'use strict';

const { open } = require('node:fs/promises');

async function readPrefix(filePath) {
  const handle = await open(filePath, 'r');
  const target = Buffer.alloc(16);

  try {
    const { bytesRead } = await handle.read(target, 0, target.length, 0);
    return target.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}

readPrefix('input.txt')
  .then((buffer) => console.log(buffer.toString('utf8')))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
