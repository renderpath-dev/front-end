// Goal:
// Create a proxy that can be revoked.

const tokenRecord = {
  value: 'secret-token',
};

const revocableRecord = Proxy.revocable(tokenRecord, {
  get(targetObject, propertyName, receiverObject) {
    return Reflect.get(targetObject, propertyName, receiverObject);
  },
});

console.log(revocableRecord.proxy.value);
revocableRecord.revoke();
console.log(revocableRecord.proxy.value);
