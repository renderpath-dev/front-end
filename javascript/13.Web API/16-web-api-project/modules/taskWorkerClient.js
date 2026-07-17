// Goal:
// Wrap worker message passing in a promise.

export function calculateSummaryInWorker (textValue) {
  return new Promise((resolve) => {
    const summaryWorker = new Worker('./workers/summaryWorker.js',{type:"module"})

    summaryWorker.addEventListener('message',(eventObject) =>{
      resolve(eventObject.data);
      summaryWorker.terminate();
    });
    summaryWorker.postMessage({textValue});
  })
}