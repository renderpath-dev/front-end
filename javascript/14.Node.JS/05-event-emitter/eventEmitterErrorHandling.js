// Goal:
// Handle an error event explicitly.

import { EventEmitter } from 'node:events';

const serviceEvents = new EventEmitter();

serviceEvents.on('error', (serviceError) => {
  console.log(serviceError.message);
});

serviceEvents.emit('error', new Error('service-failed'));
