// Goal:
// Verify that freeze blocks value updates for data properties.

'use strict';

const paymentConfig = {
  currency: 'USD',
};

Object.freeze(paymentConfig);

console.log(Object.isFrozen(paymentConfig));
paymentConfig.currency = 'EUR';
