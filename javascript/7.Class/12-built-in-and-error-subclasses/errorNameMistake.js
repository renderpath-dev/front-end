// Goal:
// Show why setting error.name is useful for custom errors.

// Expected output:
// Error
// PaymentError

class PaymentErrorWithoutName extends Error {}

class PaymentError extends Error {
  constructor(message) {
    super(message);
    this.name = "PaymentError";
  }
}

console.log(new PaymentErrorWithoutName("Failed").name);
console.log(new PaymentError("Failed").name);
