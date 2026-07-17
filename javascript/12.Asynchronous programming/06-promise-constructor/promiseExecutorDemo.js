// Goal:
// Verify that Promise executor runs synchronously

const orderPromise = new Promise((resolve) => {
  console.log('executor started');

  setTimeout(() => {
    resolve('order Ready');
  },2000);

  console.log('executor stopped');
});

  orderPromise.then((orderStatus) => {
    console.log(orderStatus);
  });

  console.log('script end')
