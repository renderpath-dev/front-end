// Goal:
// Verify return and throw transfer control differently.

function calculateDiscountRate(customerTier) {
  if (customerTier === "gold") {
    return 0.2;
  }

  if (customerTier === "silver") {
    return 0.1;
  }

  if (customerTier === "blocked") {
    throw new Error("Blocked customer cannot checkout");
  }

  return 0;
}

try {
  console.log(calculateDiscountRate("gold"));
  console.log(calculateDiscountRate("blocked"));
  console.log("after blocked checkout");
} catch (caughtError) {
  console.log(caughtError.message);
}
