// Goal:
// Show common normalization mistakes.

// Expected output:
// { quantity: 10, giftWrap: true, priceCents: 1000 }

function normalizeCheckoutInputWrong(rawInput) {
  return {
    quantity: Number(rawInput.quantity || 1),
    giftWrap: Boolean(rawInput.giftWrap),
    priceCents: Number(rawInput.priceCents || 1000),
  };
}

const rawInput = {
  quantity: "10",
  giftWrap: "false",
  priceCents: 0,
};

console.log(normalizeCheckoutInputWrong(rawInput));
