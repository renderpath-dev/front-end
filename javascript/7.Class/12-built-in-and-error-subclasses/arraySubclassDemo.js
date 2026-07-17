// Goal:
// Extend Array and add a domain-specific method.

// Expected output:
// 3
// true
// 600

class CartLineList extends Array {
  totalCents() {
    return this.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
  }
}

const lines = new CartLineList(
  { priceCents: 100, quantity: 2 },
  { priceCents: 200, quantity: 2 },
);

console.log(lines.length);
console.log(lines instanceof Array);
console.log(lines.totalCents());
