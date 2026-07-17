// Goal:
// Show common expression and operator mistakes in a cart quote.

const brokenRequest = {
  customer: null,
  items: [{ unitPrice: "80", quantity: "2" }],
  options: {
    shippingAmount: 0,
  },
};

try {
  console.log(brokenRequest.customer.name);
} catch (error) {
  console.log(error.name);
}

const wrongShipping = brokenRequest.options.shippingAmount || 12;
const correctShipping = brokenRequest.options.shippingAmount ?? 12;

console.log(wrongShipping);
console.log(correctShipping);
console.log(brokenRequest.items[0].unitPrice + brokenRequest.items[0].quantity);
console.log(Number(brokenRequest.items[0].unitPrice) + Number(brokenRequest.items[0].quantity));
