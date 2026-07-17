// Goal:
// Verify how a synchronous callback is called by another function.

function formatOrderLabel(orderId, labelBuilder) {
  const labelText = labelBuilder(orderId);
  return `Order: ${labelText}`;
}

function createShortOrderLabel(orderId) {
  return `#${orderId}`;
}

const orderLabel = formatOrderLabel(42, createShortOrderLabel);

console.log(orderLabel);
