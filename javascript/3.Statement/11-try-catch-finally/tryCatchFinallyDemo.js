// Goal:
// Verify try, catch, and finally execution order.

function parsePositiveQuantity(rawQuantity) {
  try {
    const quantity = Number(rawQuantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error("Quantity must be positive");
    }

    return quantity;
  } catch (caughtError) {
    console.log(`caught:${caughtError.message}`);
    return 1;
  } finally {
    console.log("cleanup finished");
  }
}

console.log(parsePositiveQuantity("3"));
console.log(parsePositiveQuantity("bad"));
