// Goal:
// Preview assignment and destructuring assignment.

// Expected output:
// 2
// p1
// Keyboard
// 3

let quantity = 1;
quantity = quantity + 1;

const productRecord = { id: "p1", title: "Keyboard" };
const { id: productId, title } = productRecord;
const [firstScore, , thirdScore] = [1, 2, 3];

console.log(quantity);
console.log(productId);
console.log(title);
console.log(thirdScore);
