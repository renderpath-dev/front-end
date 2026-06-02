// Goal:
// Compare Reflect.defineProperty return value with object mutation.

const settingsRecord = {};

const defineResult = Reflect.defineProperty(settingsRecord, 'theme', {
  value: 'dark',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(defineResult);
console.log(settingsRecord.theme);
