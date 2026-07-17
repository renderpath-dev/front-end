// Goal:
// Compare class updates, inline styles, and computed styles.

const statusCardElement = document.querySelector('#status-card');
const toggleButtonElement = document.querySelector('#toggle-button');

statusCardElement.style.backgroundColor = 'lightyellow';

console.log(statusCardElement.style.backgroundColor);
console.log(getComputedStyle(statusCardElement).fontWeight);

toggleButtonElement.addEventListener('click', () => {
  statusCardElement.classList.toggle('is-active');
  console.log(statusCardElement.classList.contains('is-active'));
  console.log(getComputedStyle(statusCardElement).fontWeight);
});
