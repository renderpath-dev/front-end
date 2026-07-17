// Goal:
// Build a cart quote by combining expressions and operators.

const cartRequest = {
  customer: {
    name: "Iris",
    tier: "gold",
  },
  items: [
    { sku: "K100", title: "Keyboard", unitPrice: 80, quantity: 1 },
    { sku: "M200", title: "Mouse", unitPrice: 25, quantity: 2 },
  ],
  coupon: {
    code: "SAVE10",
    discountRate: 0.1,
  },
  options: {
    taxRate: 0.0825,
    freeShippingThreshold: 100,
    shippingAmount: 12,
  },
};

const calculateSubtotal = function (items) {
  let subtotalAmount = 0;

  for (const cartItem of items) {
    subtotalAmount += cartItem.unitPrice * cartItem.quantity;
  }

  return subtotalAmount;
};

const buildQuote = function (request) {
  const items = request.items ?? [];
  const subtotalAmount = calculateSubtotal(items);
  const discountRate = request.coupon?.discountRate ?? 0;
  const discountAmount = subtotalAmount * discountRate;
  const taxableAmount = subtotalAmount - discountAmount;
  const taxRate = request.options?.taxRate ?? 0;
  const taxAmount = taxableAmount * taxRate;
  const threshold = request.options?.freeShippingThreshold ?? Infinity;
  const baseShipping = request.options?.shippingAmount ?? 0;
  const isGoldCustomer = request.customer?.tier === "gold";
  const shippingAmount = taxableAmount >= threshold || isGoldCustomer ? 0 : baseShipping;

  const quoteRecord = {
    customerName: request.customer?.name ?? "Guest",
    subtotalAmount,
    discountAmount,
    taxAmount,
    shippingAmount,
    totalAmount: taxableAmount + taxAmount + shippingAmount,
    createdAt: new Date("2026-05-29T09:00:00.000Z"),
    temporaryDebugValue: `${items.length}:${discountRate}`,
  };

  delete quoteRecord.temporaryDebugValue;

  return quoteRecord;
};

const quoteRecord = buildQuote(cartRequest);

console.log(quoteRecord.customerName);
console.log(quoteRecord.subtotalAmount);
console.log(quoteRecord.discountAmount);
console.log(quoteRecord.taxAmount);
console.log(quoteRecord.shippingAmount);
console.log(quoteRecord.totalAmount);
console.log(quoteRecord.createdAt.toISOString());
console.log("temporaryDebugValue" in quoteRecord);
