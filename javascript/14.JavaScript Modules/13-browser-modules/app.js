// Goal:
// Import a browser module and write the result into the DOM.

import { renderProductCard } from './productCardRenderer.js';

const outputElement = document.querySelector('#output');

outputElement.textContent = renderProductCard('Keyboard', 99);
