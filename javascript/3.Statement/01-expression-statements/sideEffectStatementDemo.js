// Goal:
// Compare useful expression statements with ignored pure expressions.

let cartTotal = 40;
cartTotal = cartTotal + 8;
cartTotal++;

const customerProfile = {
  name: "Mira",
  temporaryToken: "token-123",
};

delete customerProfile.temporaryToken;

Math.max(10, 20);

console.log(cartTotal);
console.log(customerProfile);
