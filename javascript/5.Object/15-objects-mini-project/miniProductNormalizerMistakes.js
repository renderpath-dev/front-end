// Goal:
// Show common object mistakes from the mini project.

const productIndex = {};
productIndex["toString"] = {
  sku: "toString",
  title: "Unsafe key",
};

console.log(typeof productIndex.toString);

const defaultCard = {
  tags: [],
};

const firstCard = {
  ...defaultCard,
  sku: "A",
};

const secondCard = {
  ...defaultCard,
  sku: "B",
};

firstCard.tags.push("sale");

console.log(secondCard.tags.length);
