// Goal:
// Send work to a Web Worker and receive a result.

const startButtonElement = document.querySelector('#start-button');
const workerOutputElement = document.querySelector('#worker-output');

const calculationWorker = new Worker('./primeWorker.js', { type: 'module' });

calculationWorker.addEventListener('message', (eventObject) => {
  workerOutputElement.textContent = `Prime count: ${eventObject.data.primeCount}`;
});

startButtonElement.addEventListener('click', () => {
  workerOutputElement.textContent = 'Working...';
  calculationWorker.postMessage({ maxNumber: 20000 });
});
