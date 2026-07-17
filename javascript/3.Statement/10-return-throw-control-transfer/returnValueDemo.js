// Goal:
// Verify that return ends function execution and provides a value.

function getShippingLabel(countryCode) {
  if (countryCode === "US") {
    return "domestic";
  }

  return "international";
}

console.log(getShippingLabel("US"));
console.log(getShippingLabel("CA"));
