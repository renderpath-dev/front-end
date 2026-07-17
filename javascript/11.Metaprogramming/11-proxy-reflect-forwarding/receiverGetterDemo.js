// Goal:
// Preserve getter this binding with Reflect.get receiver.

const baseRecord = {
  get label() {
    return `label:${this.name}`;
  },
};

const childRecord = {
  name: 'child',
};

Object.setPrototypeOf(childRecord, baseRecord);

const childProxy = new Proxy(childRecord, {
  get(targetObject, propertyName, receiverObject) {
    return Reflect.get(targetObject, propertyName, receiverObject);
  },
});

console.log(childProxy.label);
