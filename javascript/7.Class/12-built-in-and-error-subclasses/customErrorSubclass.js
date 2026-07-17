// Goal:
// Create a custom Error subclass with extra context.

// Expected output:
// ValidationError
// INVALID_PRICE
// true

class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
  }
}

function validatePrice(priceCents) {
  if (!Number.isInteger(priceCents) || priceCents < 0) {
    throw new ValidationError("Price must be non-negative cents", "INVALID_PRICE");
  }
}

try {
  validatePrice(-1);
} catch (error) {
  console.log(error.name);
  console.log(error.code);
  console.log(error instanceof ValidationError);
}
