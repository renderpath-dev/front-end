// Goal:
// Verify how EventEmitter registers and emits events.

import { EventEmitter } from 'node:events';

const orderEvents = new EventEmitter();

orderEvents.on('created', (orderId) => {
  console.log(`order-created:${orderId}`);
});

orderEvents.once('paid', (orderId) => {
  console.log(`order-paid-once:${orderId}`);
});

orderEvents.emit('created', 'ORD-100');
orderEvents.emit('paid', 'ORD-100');
orderEvents.emit('paid', 'ORD-100');
