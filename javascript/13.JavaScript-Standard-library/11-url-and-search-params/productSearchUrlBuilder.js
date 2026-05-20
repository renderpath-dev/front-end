// Goal:
// Build a URL with encoded query parameters.

const productSearchUrl = new URL('https://example.com/products');
productSearchUrl.searchParams.set('category', 'books');
productSearchUrl.searchParams.set('sort', 'price asc');
productSearchUrl.hash = 'results';

console.log(productSearchUrl.toString());
