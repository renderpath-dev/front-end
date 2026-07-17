// Goal:
// Show that for...in can include inherited enumerable properties.

const defaults = {
  currency: "USD",
};

const invoice = Object.create(defaults);
invoice.total = 100;

const allNames = [];
const ownNames = [];

for (const propertyName in invoice) {
  allNames.push(propertyName);

  if (Object.hasOwn(invoice, propertyName)) {
    ownNames.push(propertyName);
  }
}

console.log(allNames);
console.log(ownNames);
