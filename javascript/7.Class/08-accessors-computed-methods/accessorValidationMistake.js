// Goal:
// Verify that a setter can reject invalid assignment.

// Expected output:
// RangeError
// false

class CartLine {
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

const line = new CartLine();

try {
  line.quantity = -1;
} catch (error) {
  console.log(error.constructor.name);
}

console.log(Object.hasOwn(line, "quantity"));
