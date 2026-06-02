// Goal:
// Verify that different built-in APIs have different internal models.

const inventoryLookup = new Map();
inventoryLookup.set('keyboard', 12);
inventoryLookup.set('monitor', 4);

const requestedItemName = 'keyboard';
const availableItemCount = inventoryLookup.get(requestedItemName);

const releaseDate = new Date('2026-05-12T18:30:00Z');
const releaseIsoText = releaseDate.toISOString();

const productSearchUrl = new URL('https://example.com/products');
productSearchUrl.searchParams.set('category', 'books');

console.log(availableItemCount);
console.log(releaseIsoText);
console.log(productSearchUrl.toString());
