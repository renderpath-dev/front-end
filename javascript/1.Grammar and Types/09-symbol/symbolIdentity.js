// Goal:
// Show Symbol identity.

// Expected output:
// false
// symbol
// Symbol(product)

const firstToken = Symbol("product");
const secondToken = Symbol("product");

console.log(firstToken === secondToken);
console.log(typeof firstToken);
console.log(String(firstToken));
