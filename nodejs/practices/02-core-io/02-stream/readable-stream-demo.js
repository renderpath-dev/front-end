'use strict';

const { Readable } = require('node:stream');

async function main() {
  const source = Readable.from(['alpha', 'beta', 'gamma']);

  for await (const chunk of source) {
    console.log(chunk);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
