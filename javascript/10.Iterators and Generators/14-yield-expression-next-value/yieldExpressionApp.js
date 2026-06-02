// Goal:
// Send values back into a generator with next(value).
/**
 * @returns {Generator<string, number, number>}
 */
function* createInteractiveScoreGenerator() {
  const firstScore = yield 'first-score-request';
  const secondScore = yield 'second-score-request';
  return firstScore + secondScore;
}

const scoreGenerator = createInteractiveScoreGenerator();

console.log(scoreGenerator.next());
console.log(scoreGenerator.next(40));
console.log(scoreGenerator.next(60));
