// Goal:
// Show temporal dead zone for let.

// Expected output:
// ReferenceError
// pending

try {
  console.log(orderStatus);
} catch (error) {
  console.log(error.constructor.name);
}

let orderStatus = "pending";
console.log(orderStatus);
