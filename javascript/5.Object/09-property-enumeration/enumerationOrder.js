// Goal:
// Observe own property enumeration order for integer-like keys, string keys, and symbol keys.

const orderRecord = {
  beta: "B",
  10: "ten",
  alpha: "A",
  2: "two",
};

const privateSymbol = Symbol("private");
orderRecord[privateSymbol] = "hidden-by-symbol";
orderRecord.gamma = "G";

console.log(Reflect.ownKeys(orderRecord).map(String));
