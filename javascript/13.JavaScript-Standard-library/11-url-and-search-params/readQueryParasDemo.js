// Goal:
// Read query parameters from a URL object.

const incomingArticleUrl = new URL('https://example.com/read?id=42&mode=print');
const articleIdText = incomingArticleUrl.searchParams.get('id');
const articleModeText = incomingArticleUrl.searchParams.get('mode');
const missingValueText = incomingArticleUrl.searchParams.get('missing');

console.log(articleIdText);
console.log(articleModeText);
console.log(missingValueText);
