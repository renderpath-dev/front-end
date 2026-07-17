// Goal:
// Create, insert, and replace DOM content.

const cartListElement = document.querySelector('#cart-list');
const resetButtonElement = document.querySelector('#reset-button');

function createCartItemElement(productName, quantityCount) {
  const itemElement = document.createElement('li');
  itemElement.textContent = `${productName}: ${quantityCount}`;
  return itemElement;
}

cartListElement.append(createCartItemElement('Keyboard', 2));
cartListElement.append(createCartItemElement('Mouse', 1));
cartListElement.prepend(createCartItemElement('Monitor', 1));

resetButtonElement.addEventListener('click', () => {
  cartListElement.replaceChildren();
  cartListElement.append(createCartItemElement('Empty cart', 0));
});
