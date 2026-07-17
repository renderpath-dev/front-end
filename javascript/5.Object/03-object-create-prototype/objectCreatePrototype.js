// Goal:
// Verify that Object.create links a new object to a prototype object.

const catalogDefaults = {
  currency: "USD",
  visibility: "public",
};

const bookOffer = Object.create(catalogDefaults);
bookOffer.sku = "BK-202";
bookOffer.price = 45;

console.log(bookOffer.currency);
console.log(Object.hasOwn(bookOffer, "currency"));
console.log("currency" in bookOffer);
console.log(Object.getPrototypeOf(bookOffer) === catalogDefaults);
