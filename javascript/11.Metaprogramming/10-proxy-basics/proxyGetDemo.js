// Goal:
// Intercept property reads with a get trap.

const profileRecord = {
  username: 'ada',
};

const profileProxy = new Proxy(profileRecord, {
  get(targetObject, propertyName, receiverObject) {
    if (propertyName in targetObject) {
      return Reflect.get(targetObject, propertyName, receiverObject);
    }

    return 'missing';
  },
});

console.log(profileProxy.username);
console.log(profileProxy.email);
