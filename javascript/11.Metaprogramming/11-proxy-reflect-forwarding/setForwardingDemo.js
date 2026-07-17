// Goal:
// Add logging while preserving default set behavior.

const settingsRecord = {
  theme: 'dark',
};

const settingsProxy = new Proxy(settingsRecord, {
  set(targetObject, propertyName, nextValue, receiverObject) {
    console.log(`write:${String(propertyName)}=${nextValue}`);
    return Reflect.set(targetObject, propertyName, nextValue, receiverObject);
  },
});

settingsProxy.theme = 'light';
console.log(settingsRecord.theme);
