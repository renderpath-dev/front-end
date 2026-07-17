// Goal:
// Verify that catch binding is scoped to the catch block.

try {
  throw new Error("failed");
} catch (caughtError) {
  console.log(caughtError.message);
}

try {
  console.log(caughtError);
} catch (error) {
  console.log(error.name);
}
