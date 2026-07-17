// Goal:
// Compose symbols, descriptors, tagged templates, Proxy, and Reflect.

import { configLabel } from './configTemplate.js';
import { createValidatedConfig } from './configValidator.js';
import { validationStateKey } from './metadataKeys.js';

const dashboardConfig = createValidatedConfig({
  theme: 'dark',
  pageSize: 20,
});

const labelText = configLabel`Feature ${' Dashboard '} Mode ${dashboardConfig.theme}`;

console.log(labelText);
console.log(Object.keys(dashboardConfig));
console.log(Object.getOwnPropertySymbols(dashboardConfig).includes(validationStateKey));

console.log(dashboardConfig.writeCount);
dashboardConfig.pageSize = 30;
console.log(dashboardConfig.writeCount);
console.log(dashboardConfig.pageSize);
