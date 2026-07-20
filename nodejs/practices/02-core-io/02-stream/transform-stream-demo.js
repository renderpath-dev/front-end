'use strict';

const { Transform } = require('node:stream');

const upper = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString('utf8').toUpperCase());
  },
});

process.stdin.pipe(upper).pipe(process.stdout);
