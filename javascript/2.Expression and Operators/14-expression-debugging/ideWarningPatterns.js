// Goal:
// Compare safe expression debugging patterns.

const apiResponse = {
  payload: null,
};

try {
  console.log(apiResponse.payload.title);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}

console.log(apiResponse.payload?.title);
console.log(typeof missingRuntimeName);
