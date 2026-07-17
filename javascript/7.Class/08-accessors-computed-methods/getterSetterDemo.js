// Goal:
// Use getters and setters to expose validated state.

// Expected output:
// 25
// 3
// RangeError

class CartLine {
  constructor(unitPriceCents, quantity) {
    this.unitPriceCents = unitPriceCents;
    this.quantity = quantity;
  }

  get totalCents() {
    return this.unitPriceCents * this.quantity;
  }

  set quantity(value) {
    if (!Number.isInteger(value) || value < 1) {
      throw new RangeError("Quantity must be a positive integer");
    }

    this._quantity = value;
  }

  get quantity() {
    return this._quantity;
  }
}

const line = new CartLine(5, 5);
console.log(line.totalCents);

line.quantity = 3;
console.log(line.quantity);

try {
  line.quantity = 0;
} catch (error) {
  console.log(error.constructor.name);
}
