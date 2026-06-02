// Goal:
// Verify that writing to a non-writable property throws in strict mode.

'use strict';

const lockedConfig = {};

Object.defineProperty(lockedConfig, 'mode', {
  value: 'production',
  writable: false,
  enumerable: true,
  configurable: true,
});

lockedConfig.mode = 'development';
