// Goal:
// Verify how try/catch handles rejected promises with await

function loadBillingRecord () {
  return Promise.reject(new Error('Billing services failed.'));
}

async function renderBillingPanel () {
  try {
    const billingRecorde = await loadBillingRecord();
    console.log(billingRecorde);
  } catch (billingError) {
    console.error(billingError.message);
  }
}

async function main () {
  await renderBillingPanel();
}
main().catch((error) => {
  console.error(error);
})