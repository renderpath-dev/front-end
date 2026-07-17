// Goal:
// Verify that EventEmitter listeners run synchronously by default.

import { EventEmitter } from 'node:events';

const workflowEvents = new EventEmitter();

workflowEvents.on('step', () => {
  console.log('listener-running');
});

console.log('before-emit');
workflowEvents.emit('step');
console.log('after-emit');
