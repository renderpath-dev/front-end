// Goal:
// Show why computed property names need square brackets.

const fieldName = "warehouse";

const wrongRecord = {
  fieldName: "east",
};

const correctRecord = {
  [fieldName]: "east",
};

console.log(wrongRecord.warehouse);
console.log(wrongRecord.fieldName);
console.log(correctRecord.warehouse);
