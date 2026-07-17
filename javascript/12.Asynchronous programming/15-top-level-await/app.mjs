// Goal:
// Import a value from a module that uses top-level await.

import { runtimeConfig } from './runtimeConfig.mjs';

console.log(runtimeConfig.apiBaseUrl);
console.log(runtimeConfig.retryCount);
