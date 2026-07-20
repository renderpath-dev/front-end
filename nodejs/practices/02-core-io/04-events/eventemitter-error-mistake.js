'use strict';

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

emitter.on('error', (error) => {
  console.error(`Handled: ${error.message}`);
  process.exitCode = 1;
});

emitter.emit('error', new Error('Input stream failed'));
