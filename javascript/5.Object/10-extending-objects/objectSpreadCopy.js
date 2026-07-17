// Goal:
// Verify that object spread creates a new object and later properties override earlier ones.

const defaultCard = {
  currency: "USD",
  visible: true,
  stock: 0,
};

const productCard = {
  sku: "PEN-8",
  stock: 12,
};

const visibleCard = {
  ...defaultCard,
  ...productCard,
  badge: "new",
};

console.log(visibleCard);
console.log(visibleCard === productCard);
