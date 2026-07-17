// Goal:
// Add logging while preserving default get behavior.

const settingsRecord = {
  theme: 'dark',
};

const settingsProxy = new Proxy(settingsRecord, {
  get(targetObject, propertyName, receiverObject) {
    console.log(`read:${String(propertyName)}`);
    return Reflect.get(targetObject, propertyName, receiverObject);
  },
});

console.log(settingsProxy.theme);
