// Goal:
// Build a RegExp from runtime input safely when RegExp.escape is available.

const searchKeywordText = 'price.plus';
const escapedKeywordText = RegExp.escape(searchKeywordText);
const keywordPattern = new RegExp(escapedKeywordText, 'i');

console.log(keywordPattern.test('The field is price.plus'));
