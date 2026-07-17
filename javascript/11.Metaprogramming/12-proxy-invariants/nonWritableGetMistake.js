// Goal:
// Show that get cannot lie about a fixed data property.

const targetRecord = {};

Object.defineProperty(targetRecord, 'fixedValue', {
  value: 100,
  writable: false,
  configurable: false,
});

const targetProxy = new Proxy(targetRecord, {
  get() {
    return  200;
  },
});

console.log(targetProxy.fixedValue);
