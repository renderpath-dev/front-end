const chooseBtn = document.getElementById('chooseBtn');
const fruitInput = document.getElementById('fruitInput');

function chooseFruit() {
  const fruitType = fruitInput.value.trim().toLowerCase();

  switch (fruitType) {
    case 'orange':
      console.log('Oranges are 0.95 pound');
      break;
    case 'apples':
      console.log('Apples are 1.95 pound');
      break;
    case 'banana':
      console.log('Bananas are 2.95 pound');
      break;
    case 'watermelon':
      console.log('Watermelon above 3.95 pound');
      break;
    case 'crimson':
      console.log('Crimson above 4.95 pound');
      break;
    case 'cherries':
      console.log('Cherries above 5.95 pound');
      break;
    case 'mangoes':
      console.log('Mangoes are 6.95 pound');
      break;
    default:
      console.log(`Sorry, we are out of ${fruitType} fruits!`);
  }
}

chooseBtn.addEventListener('click', chooseFruit);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    chooseFruit();
  }
});
