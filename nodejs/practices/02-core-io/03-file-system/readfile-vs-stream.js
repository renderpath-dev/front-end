'use strict';

const { rm, writeFile, readFile } = require('node:fs/promises');
const { createReadStream } = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const samplePath = path.join(os.tmpdir(), 'node-core-io-readfile-vs-stream.txt');

async function main() {
  await writeFile(samplePath, '0123456789abcdef\n'.repeat(16_384), 'utf8');

  const entireFile = await readFile(samplePath);
  let streamedBytes = 0;
  let chunkCount = 0;

  for await (const chunk of createReadStream(samplePath, { highWaterMark: 8_192 })) {
    streamedBytes += chunk.length;
    chunkCount += 1;
  }

  console.log('readFile bytes:', entireFile.length);
  console.log('Streamed bytes:', streamedBytes);
  console.log('Stream chunks:', chunkCount);
}

main()
  .finally(() => rm(samplePath, { force: true }))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
