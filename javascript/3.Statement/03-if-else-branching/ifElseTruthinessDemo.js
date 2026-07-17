// Goal:
// Verify truthiness and block usage in if statements.

const searchTerm = "";
const itemsInCart = 0;
const customer = { tier: "gold" };

if (searchTerm) {
  console.log("search active");
} else {
  console.log("search empty");
}

if (itemsInCart) {
  console.log("cart has items");
} else {
  console.log("cart empty");
}

if (customer) {
  console.log(customer.tier);
}
