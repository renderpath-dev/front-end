// Goal:
// Compare nullish coalescing with logical OR.

// Expected output:
// 10
// 0
// fallback
// fallback

const stockCount = 0;
const couponCode = "";

console.log(stockCount || 10);
console.log(stockCount ?? 10);
console.log(couponCode || "fallback");
console.log(null ?? "fallback");
