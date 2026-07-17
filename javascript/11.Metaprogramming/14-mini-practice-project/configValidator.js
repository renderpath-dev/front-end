// Goal:
// Create a validated config object with Proxy and Reflect.

import { validationStateKey } from './metadataKeys.js';

export function createValidatedConfig(initialConfigRecord) {
  const targetConfig = { ...initialConfigRecord };

  Object.defineProperty(targetConfig, validationStateKey, {
    value: {
      writeCount: 0,
    },
    enumerable: false,
    writable: true,
    configurable: false,
  });

  return new Proxy(targetConfig, {
    set(targetObject, propertyName, nextValue, receiverObject) {
      if (propertyName === 'pageSize' && nextValue <= 0) {
        throw new RangeError('pageSize must be positive');
      }

      targetObject[validationStateKey].writeCount += 1;

      return Reflect.set(targetObject, propertyName, nextValue, receiverObject);
    },
    get(targetObject, propertyName, receiverObject) {
      if (propertyName === 'writeCount') {
        return targetObject[validationStateKey].writeCount;
      }

      return Reflect.get(targetObject, propertyName, receiverObject);
    },
  });
}
