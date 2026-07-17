// Goal:
// Show that ownKeys cannot hide a non-configurable property.

const targetRecord = {};

Object.defineProperty(targetRecord, 'fixedKey', {
  value: 1,
  configurable: false,
  enumerable: true,
});

const targetProxy = new Proxy(targetRecord, {
  ownKeys() {
    return [];
  },
});

console.log(Reflect.ownKeys(targetProxy));
