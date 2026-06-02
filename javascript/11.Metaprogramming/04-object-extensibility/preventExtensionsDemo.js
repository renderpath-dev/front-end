// Goal:
// Verify that preventExtensions blocks new properties.

'use strict';

const runtimeConfig = {
  theme: 'dark',
};

Object.preventExtensions(runtimeConfig);

console.log(Object.isExtensible(runtimeConfig));
runtimeConfig.pageSize = 20;
