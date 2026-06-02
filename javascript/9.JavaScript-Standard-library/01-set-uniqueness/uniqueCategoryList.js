// Goal:
// Remove duplicate category names while preserving first-seen order.

function createUniqueCategoryList(categoryItems) {
  const categorySet = new Set(categoryItems);
  return Array.from(categorySet);
}

const categoryResultList = createUniqueCategoryList([
  'books',
  'games',
  'books',
  'tools',
]);

console.log(categoryResultList);
