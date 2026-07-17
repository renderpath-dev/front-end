// Goal:
// Show why for...in needs an own-property guard.

const defaultRecord = {
  inheritedFlag: true,
};

const orderRecord = Object.create(defaultRecord);
orderRecord.id = "ORD-1";
orderRecord.status = "paid";

const unsafeKeys = [];
const safeKeys = [];

for (const key in orderRecord) {
  unsafeKeys.push(key);

  if (Object.hasOwn(orderRecord, key)) {
    safeKeys.push(key);
  }
}

console.log(unsafeKeys);
console.log(safeKeys);
