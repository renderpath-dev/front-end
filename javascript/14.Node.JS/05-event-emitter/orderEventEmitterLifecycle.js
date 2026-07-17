// Goal:
// Verify listener registration, one-time listeners, and listener removal.

import { EventEmitter } from 'node:events';

const orderEvents = new EventEmitter();

function handleOrderCreated(orderId) {
  console.log(`created:${orderId}`);
}

orderEvents.on('created', handleOrderCreated);

orderEvents.once('paid', (orderId) => {
  console.log(`paid-once:${orderId}`);
});

console.log(orderEvents.emit('created', 'ORD-100'));
console.log(orderEvents.emit('paid', 'ORD-100'));
console.log(orderEvents.emit('paid', 'ORD-100'));

orderEvents.off('created', handleOrderCreated);

console.log(orderEvents.emit('created', 'ORD-101'));
