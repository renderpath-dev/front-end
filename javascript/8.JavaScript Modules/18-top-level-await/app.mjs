// Goal:
// Import a value from a module that uses top-level await.

import { loadedConfig } from './configLoader.mjs';

console.log(loadedConfig.pageSize);
console.log(loadedConfig.layoutMode);
