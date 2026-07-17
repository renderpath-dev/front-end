// Goal:
// Normalize raw checkout values from form-like input.

// Expected output:
// { productId: 'p100', quantity: 2, giftWrap: false, couponCode: null, priceCents: 1999 }
// { productId: 'p200', quantity: 1, giftWrap: true, couponCode: 'SAVE10', priceCents: 0 }

function parseRequiredString(rawValue, fieldName) {
  if (typeof rawValue !== "string") {
    throw new TypeError(`${fieldName} must be a string`);
  }

  const trimmedValue = rawValue.trim();

  if (trimmedValue.length === 0) {
    throw new RangeError(`${fieldName} cannot be empty`);
  }

  return trimmedValue;
}

function parsePositiveInteger(rawValue, fieldName) {
  const convertedValue = Number(rawValue);

  if (!Number.isSafeInteger(convertedValue) || convertedValue < 1) {
    throw new RangeError(`${fieldName} must be a positive safe integer`);
  }

  return convertedValue;
}

function parseBooleanFlag(rawValue) {
  if (rawValue === true || rawValue === "true") {
    return true;
  }

  if (rawValue === false || rawValue === "false" || rawValue == null) {
    return false;
  }

  throw new TypeError("Boolean flag must be true or false");
}

function parseOptionalCoupon(rawValue) {
  if (rawValue == null) {
    return null;
  }

  if (typeof rawValue !== "string") {
    throw new TypeError("Coupon code must be a string");
  }

  const trimmedValue = rawValue.trim();
  return trimmedValue.length === 0 ? null : trimmedValue.toUpperCase();
}

function parsePriceCents(rawValue) {
  const convertedValue = Number(rawValue);

  if (!Number.isSafeInteger(convertedValue) || convertedValue < 0) {
    throw new RangeError("Price cents must be a non-negative safe integer");
  }

  return convertedValue;
}

function normalizeCheckoutInput(rawInput) {
  if (typeof rawInput !== "object" || rawInput === null) {
    throw new TypeError("Checkout input must be an object");
  }

  return {
    productId: parseRequiredString(rawInput.productId, "productId"),
    quantity: parsePositiveInteger(rawInput.quantity ?? "1", "quantity"),
    giftWrap: parseBooleanFlag(rawInput.giftWrap),
    couponCode: parseOptionalCoupon(rawInput.couponCode),
    priceCents: parsePriceCents(rawInput.priceCents ?? "0"),
  };
}

const firstRawInput = {
  productId: " p100 ",
  quantity: "2",
  giftWrap: "false",
  couponCode: "",
  priceCents: "1999",
};

const secondRawInput = {
  productId: "p200",
  giftWrap: "true",
  couponCode: "save10",
  priceCents: 0,
};

console.log(normalizeCheckoutInput(firstRawInput));
console.log(normalizeCheckoutInput(secondRawInput));
