// Goal:
// Count prime numbers in a worker thread.

function isPrimeNumber(candidateNumber) {
  if (candidateNumber < 2) {
    return false;
  }

  for (
    let divisorNumber = 2;
    divisorNumber * divisorNumber <= candidateNumber;
    divisorNumber += 1
  ) {
    if (candidateNumber % divisorNumber === 0) {
      return false;
    }
  }

  return true;
}

self.addEventListener('message', (eventObject) => {
  const { maxNumber } = eventObject.data;
  let primeCount = 0;

  for (let currentNumber = 2; currentNumber <= maxNumber; currentNumber += 1) {
    if (isPrimeNumber(currentNumber)) {
      primeCount += 1;
    }
  }

  self.postMessage({ primeCount });
});
