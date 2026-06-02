// Goal:
// Compare throwing an Error object with throwing a plain string.

try {
  throw 'Request failed';
} catch (plainFailureValue) {
  console.log(typeof plainFailureValue);
  console.log(plainFailureValue.message);
}

try {
  throw new Error('Request failed');
} catch (structuredFailureValue) {
  console.log(structuredFailureValue instanceof Error);
  console.log(structuredFailureValue.message);
}
