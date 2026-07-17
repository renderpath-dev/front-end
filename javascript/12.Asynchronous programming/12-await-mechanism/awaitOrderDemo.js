// Goal:
// Verify that await pauses only the current async function

function loadOrderStatus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('ready');
    }, 10);
  });
}

async function printOrderStatus() {
  console.log('before await');

  const orderStatus = await loadOrderStatus();

  console.log(orderStatus);
  console.log('after await');
}

printOrderStatus().catch((error) => {
  console.error(error);
});

console.log('outside async function');