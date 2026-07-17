// Goal:
// Show what a Flow-style type annotation looks like

// @flow


function createPriceLabel(amountValue: number) :string {
  return `$${amountValue.toFixed(2)}`;
}

console.log(createPriceLabel(19.5));
