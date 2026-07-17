// Goal:
// Preview destructuring assignment for arrays and objects.

let firstItem;
let secondItem;
[firstItem, secondItem] = ["keyboard", "mouse"];

let productTitle;
({ title: productTitle } = { title: "Monitor" });

console.log(firstItem);
console.log(secondItem);
console.log(productTitle);
