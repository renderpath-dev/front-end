// Goal:
// Verify why accessing a property on null throws TypeError.

const selectedCustomer = null;

try {
  console.log(selectedCustomer.name);
} catch (error) {
  console.log(error.name);
}

console.log(selectedCustomer?.name);
