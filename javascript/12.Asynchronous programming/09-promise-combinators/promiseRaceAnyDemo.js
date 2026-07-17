// Goal:
// Compare Promise.race and Promise.any

const slowSuccess = new Promise((resolve) => {
  setTimeout(() => {resolve('slow success');}, 2000);
});

const fastFailure = new Promise((resolve,reject) => {
  setTimeout(() => {reject(new Error('fast failure'));}, 1000);
});

Promise.race([slowSuccess,fastFailure]).catch((raceError) => {
  console.log(`race: ${raceError.message}`);
});

Promise.any([slowSuccess,fastFailure]).then((firstSuccess) => {
  console.log(`any: ${firstSuccess}`);
})