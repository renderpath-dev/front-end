// Goal:
// Verify that an undeclared identifier lookup throws ReferenceError.

try {
  console.log(missingProductName);
} catch (error) {
  console.log(error.name);
}

const declaredProductName = "Desk";
console.log(declaredProductName);
