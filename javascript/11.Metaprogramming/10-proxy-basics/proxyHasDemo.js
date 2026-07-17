// Goal:
// Intercept the in operator with a has trap.

const permissionRecord = {
  read: true,
  write: false,
};

const permissionProxy = new Proxy(permissionRecord, {
  has(targetObject, propertyName) {
    if (propertyName === 'admin') {
      return false;
    }

    return Reflect.has(targetObject, propertyName);
  },
});

console.log('read' in permissionProxy);
console.log('admin' in permissionProxy);
