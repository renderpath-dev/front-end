// Goal:
// Show common statement mistakes in checkout flow code.

function buildBrokenCheckoutSummary(orderRequest) {
  let subtotal = 0;

  if (!orderRequest);
  {
    console.log("This block runs even when the request exists.");
  }

  for (const cartItem of orderRequest.items) {
    switch (cartItem.type) {
      case "physical":
        subtotal += cartItem.price * cartItem.quantity;
      case "digital":
        subtotal += cartItem.price * cartItem.quantity;
        break;
      default:
        subtotal += 0;
    }
  }

  return subtotal;
}

const brokenOrder = {
  items: [
    { type: "physical", price: 10, quantity: 1 },
  ],
};

console.log(buildBrokenCheckoutSummary(brokenOrder));
