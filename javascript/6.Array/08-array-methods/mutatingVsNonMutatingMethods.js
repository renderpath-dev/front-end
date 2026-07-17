// Goal:
// Compare methods that mutate the original array with methods that create a new array.

const originalPrices = [30, 10, 20];
const sortedCopy = originalPrices.toSorted((left, right) => left - right);

console.log(originalPrices);
console.log(sortedCopy);

const mutablePrices = [30, 10, 20];
const sortReturnValue = mutablePrices.sort((left, right) => left - right);

console.log(mutablePrices);
console.log(sortReturnValue === mutablePrices);

const splicedCopy = originalPrices.toSpliced(1, 1, 99);
console.log(originalPrices);
console.log(splicedCopy);
