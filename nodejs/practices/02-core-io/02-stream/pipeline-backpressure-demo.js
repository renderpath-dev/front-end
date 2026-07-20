'use strict';

const fs = require('node:fs');
const { Transform } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const addPrefix = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, Buffer.concat([Buffer.from('> '), chunk]));
  },
});

async function main() {
  await pipeline(
    fs.createReadStream('input.txt'),
    addPrefix,
    fs.createWriteStream('output.txt'),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
