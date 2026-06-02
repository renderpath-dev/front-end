// Goal:
// Delegate iteration with yield star.

function* createCombinedMenuGenerator() {
  yield 'home';
  yield* ['products', 'pricing'];
  yield* new Set(['docs', 'support']);
  yield 'contact';
}

for (const menuItem of createCombinedMenuGenerator()) {
  console.log(menuItem);
}
