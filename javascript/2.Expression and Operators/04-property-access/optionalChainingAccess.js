// Goal:
// Verify optional chaining and nullish fallback during property access.

const apiResponse = {
  payload: null,
  meta: { count: 0 },
};

console.log(apiResponse.payload?.title);
console.log(apiResponse.meta?.count ?? 10);
console.log(apiResponse.missing?.count ?? "none");
