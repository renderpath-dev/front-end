// Goal:
// Verify that seal blocks deletion but allows writable value updates.

'use strict';

const featureConfig = {
  enabled: true,
};

Object.seal(featureConfig);
featureConfig.enabled = false;

console.log(featureConfig.enabled);
console.log(Object.isSealed(featureConfig));

delete featureConfig.enabled;
