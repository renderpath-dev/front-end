// Goal:
// Compare unsafe query string concatenation with URLSearchParams.

const unsafeSearchText = 'front end & JavaScript';
const unsafeSearchUrl = 'https://example.com/search?q=' + unsafeSearchText;

const safeSearchUrl = new URL('https://example.com/search');
safeSearchUrl.searchParams.set('q', unsafeSearchText);

console.log(unsafeSearchUrl);
console.log(safeSearchUrl.toString());
