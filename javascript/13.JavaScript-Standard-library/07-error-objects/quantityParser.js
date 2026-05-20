// Goal
// Classify invalid quantity input with different Error Subclasses.

function parseRequiredQuantity(quantityText) {
  const parsedQuantity = Number(quantityText);

  if (!Number.isInteger(parsedQuantity)) {
    throw new TypeError('Quantity must be an integer');
  }
  if ( parsedQuantity <=0 ) {
    throw new RangeError('Quantity must be a positive integer');
  }
  return parsedQuantity;
}
try {
  const acceptQuantity = parseRequiredQuantity('0');
  console.log(acceptQuantity);
} catch (caughtQuantityError) {
  console.log(caughtQuantityError.name);
  console.log(caughtQuantityError.message);
}