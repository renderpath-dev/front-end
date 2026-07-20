'use strict';

const runtimeObservations = {
  windowType: typeof window,
  documentType: typeof document,
  processType: typeof process,
};

console.log('Runtime observations:', runtimeObservations);
console.log('Node runtime detected:', runtimeObservations.processType === 'object');
console.log(
  'Browser globals available:',
  runtimeObservations.windowType !== 'undefined' ||
    runtimeObservations.documentType !== 'undefined',
);
