// Goal:
// Use a static factory method to create instances from another unit.

// Expected output:
// 1299
// true
// undefined

class Money {
  constructor(cents) {
    this.cents = cents;
  }

  static fromDollars(dollars) {
    return new Money(Math.round(dollars * 100));
  }

  format() {
    return `$${(this.cents / 100).toFixed(2)}`;
  }
}

const price = Money.fromDollars(12.99);

console.log(price.cents);
console.log(price instanceof Money);
console.log(typeof price.fromDollars);
