// Goal:
// Query DOM elements and inspect their text and dataset values.

const rootElement = document.querySelector('#app-root');
const headingElement = rootElement.querySelector('.page-heading');
const productItemElements = document.querySelectorAll('.product-item');

console.log(headingElement.textContent);
console.log(productItemElements.length);

for (const productItemElement of productItemElements) {
  console.log(productItemElement.dataset.sku, productItemElement.textContent);
}
