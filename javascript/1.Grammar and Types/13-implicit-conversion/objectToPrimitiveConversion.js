// Goal:
// Show object-to-primitive conversion with Symbol.toPrimitive.

// Expected output:
// string
// Product#p1
// default
// Product#p1
// number
// 101

const productRecord = {
  id: "p1",
  price: 100,
  [Symbol.toPrimitive](hint) {
    console.log(hint);

    if (hint === "number") {
      return this.price;
    }

    return `Product#${this.id}`;
  },
};

console.log(`${productRecord}`);
console.log(productRecord + "");
console.log(+productRecord + 1);
