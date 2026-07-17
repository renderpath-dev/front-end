// Goal:
// Verify that module scripts can import values.

import { createBrowserMessage } from './messageTools.js';

const outputElement = document.querySelector('#output');
outputElement.textContent = createBrowserMessage('module');

console.log(globalThis.classicScriptLabel);
console.log(createBrowserMessage('module'));
