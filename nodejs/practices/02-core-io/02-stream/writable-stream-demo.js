'use strict';

const { Writable } = require('node:stream');

let collected = '';

const destination = new Writable({
  decodeStrings: false,
  write(chunk, encoding, callback) {
    collected += chunk;
    callback();
  },
});

destination.once('finish', () => {
  console.log(collected.trimEnd());
});

destination.write('alpha\n');
destination.end('beta\n');
