// Goal:
// Verify constructor return behavior with primitive and object return values.

function PrimitiveReturnProduct() {
  this.name = "inside";
  return "outside";
}

function ObjectReturnProduct() {
  this.name = "inside";
  return { name: "outside" };
}

console.log(new PrimitiveReturnProduct().name);
console.log(new ObjectReturnProduct().name);
