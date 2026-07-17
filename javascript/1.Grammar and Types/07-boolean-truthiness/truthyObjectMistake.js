// Goal:
// Show that empty objects and empty arrays are truthy.

// Expected output:
// array entered
// object entered

const emptyList = [];
const emptyRecord = {};

if (emptyList) {
  console.log("array entered");
}

if (emptyRecord) {
  console.log("object entered");
}
