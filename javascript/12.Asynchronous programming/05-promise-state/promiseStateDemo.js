// Goal:
// Verify that a promise represents a future result.

const profilePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve({id:101, name: 'Ada'});
  },1000);
});
console.log(profilePromise instanceof Promise);

profilePromise.then(profileRecord => {
  console.log(profileRecord.name);
});

console.log('promise handler registered');