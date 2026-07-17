// Goal:
// Show why accidental globals are dangerous in sloppy mode.

// Expected output:
// bad-state
// ReferenceError

const sloppyModeResult = Function(`
  function createAccidentalGlobal() {
    leakedValue = "bad-state";
  }

  createAccidentalGlobal();
  const leakedValueSnapshot = globalThis.leakedValue;

  delete globalThis.leakedValue;

  function createStrictFailure() {
    "use strict";
    strictLeakedValue = "blocked";
  }

  try {
    createStrictFailure();
  } catch (error) {
    return [leakedValueSnapshot, error.constructor.name];
  }
`)();

console.log(sloppyModeResult[0]);
console.log(sloppyModeResult[1]);
