// Goal:
// Verify that a non-configurable property cannot be deleted.

'use strict';

const auditRecord = {};

Object.defineProperty(auditRecord, 'createdAt', {
  value: '2026-05-13',
  writable: true,
  enumerable: true,
  configurable: false,
});

console.log(delete auditRecord.createdAt);
