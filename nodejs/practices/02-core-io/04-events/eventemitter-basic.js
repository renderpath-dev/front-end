'use strict';

const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();

function persistent(value) {
  console.log(`on:${value}`);
}

emitter.on('record', persistent);
emitter.once('record', (value) => console.log(`once:${value}`));
emitter.emit('record', 1);
emitter.off('record', persistent);
emitter.emit('record', 2);
