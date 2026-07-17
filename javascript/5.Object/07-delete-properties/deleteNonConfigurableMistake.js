// Goal:
// Verify that a non-configurable own property cannot be deleted in strict mode.

"use strict";

const auditEntry = {};

Object.defineProperty(auditEntry, "id", {
  value: "LOG-1",
  configurable: false,
  enumerable: true,
});

try {
  delete auditEntry.id;
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(auditEntry.id);
}
