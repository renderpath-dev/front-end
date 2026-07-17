// Goal:
// Compare MutationObserver, IntersectionObserver, and ResizeObserver.

const cardList = document.querySelector('#card-list');
const addCardButton = document.querySelector('#add-card-button');
const resizeCardButton = document.querySelector('#resize-card-button');
const mutationOutput = document.querySelector('#mutation-output');
const resizeOutput = document.querySelector('#resize-output');
const intersectionOutput = document.querySelector('#intersection-output');

let mutationCount = 0;
let resizeCount = 0;
let cardId = 1;

const mutationObserver = new MutationObserver((records) => {
  mutationCount += records.length;
  mutationOutput.textContent = `DOM mutations: ${mutationCount}`;

  for (const record of records) {
    console.log(record.type, record.addedNodes.length);
  }
});

mutationObserver.observe(cardList, {
  childList: true,
});

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        intersectionOutput.textContent = `Visible card: ${entry.target.textContent}`;
      }
    }
  },
  {
    threshold: 0.5,
  },
);

const resizeObserver = new ResizeObserver((entries) => {
  resizeCount += entries.length;
  resizeOutput.textContent = `Resize entries: ${resizeCount}`;

  for (const entry of entries) {
    console.log(entry.target.textContent, entry.contentRect.width);
  }
});

for (const card of document.querySelectorAll('.card')) {
  intersectionObserver.observe(card);
  resizeObserver.observe(card);
}

addCardButton.addEventListener('click', () => {
  cardId += 1;

  const card = document.createElement('article');
  card.className = 'card';
  card.textContent = `Card ${cardId}`;

  cardList.append(card);
  intersectionObserver.observe(card);
  resizeObserver.observe(card);
});

resizeCardButton.addEventListener('click', () => {
  const firstCard = document.querySelector('.card');
  firstCard.style.width = `${firstCard.offsetWidth + 40}px`;
});
