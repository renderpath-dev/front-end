// Goal:
// Intercept property writes with a set trap.

const productRecord = {
  price: 10,
};

const productProxy = new Proxy(productRecord, {
  set(targetObject, propertyName, nextValue, receiverObject) {
    if (propertyName === 'price' && nextValue < 0) {
      throw new RangeError('Price must be non-negative');
    }

    return Reflect.set(targetObject, propertyName, nextValue, receiverObject);
  },
});

productProxy.price = 20;
console.log(productRecord.price);
productProxy.price = -1;
