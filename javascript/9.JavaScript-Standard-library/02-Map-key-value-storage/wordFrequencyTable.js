// Goal:c
// Build a word-frequency table with Map()

function createWorldFrequencyTable(sentenceText) {
  const frequencyTable = new Map();
  const wordTokens = sentenceText.toLowerCase().split('/\s+/');

  for (const wordToken of wordTokens) {
    const currentWordCount = frequencyTable.get(wordToken) ?? 0;
    frequencyTable.set(wordToken, currentWordCount + 1);
  }
  return frequencyTable;
}

const articleWordTable = createWorldFrequencyTable('JS modules JS runtime JS');
console.log(articleWordTable.get('JS'));
console.log(articleWordTable.get('modules'));