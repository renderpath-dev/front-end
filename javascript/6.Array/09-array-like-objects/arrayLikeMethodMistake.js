// Goal:
// Verify that an array-like object does not automatically inherit Array methods.

const arrayLikeResult = {
  0: 'alpha',
  1: 'beta',
  length: 2,
};

try {
  console.log(arrayLikeResult.map((value) => value.toUpperCase()));
} catch (error) {
  console.log(error.name);
}

const realResult = Array.from(arrayLikeResult);
console.log(realResult.map((value) => value.toUpperCase()));
