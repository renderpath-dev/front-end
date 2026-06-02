// Goal:
// Read string keys and symbol keys with Reflect.ownKeys.

const secretKey = Symbol('secret');

const recordStore = {
  visible: true,
  [secretKey]: 'hidden',
};

console.log(Reflect.ownKeys(recordStore));
