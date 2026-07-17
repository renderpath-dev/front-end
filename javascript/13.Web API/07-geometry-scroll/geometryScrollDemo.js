// Goal:
// Measure element geometry and scroll an element into view.

const measureButtonElement = document.querySelector('#measure-button');
const jumpButtonElement = document.querySelector('#jump-button');
const targetCardElement = document.querySelector('#target-card');

measureButtonElement.addEventListener('click', () => {
  const targetRect = targetCardElement.getBoundingClientRect();

  console.log('top:', targetRect.top);
  console.log('height:', targetRect.height);
  console.log('scrollY:', window.scrollY);
});

jumpButtonElement.addEventListener('click', () => {
  targetCardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
