// Goal:
// Verify how then, catch, finally form a promise chain

function loadCartTotal () {
  return Promise.resolve(120);
}

loadCartTotal()
.then((totalAmount) => {
  console.log(`total:${totalAmount}`);
  return totalAmount * 0.1;
})
.then((discountAmount) => {
  console.log(`discount:${discountAmount}`);
  return discountAmount;
})
.catch((loadError) => {
  console.error(loadError.message);
})
.finally(() => {
  console.log(`completed successfully`);
})