// Goal:
// Preview iterator helpers if the runtime supports them.

const scoreIterator = [40, 80, 100, 55].values();

if (typeof scoreIterator.filter === 'function') {
  const passingScoreLabels = scoreIterator
    .filter((scoreValue) => scoreValue >= 60)
    .map((scoreValue) => `score:${scoreValue}`);

  for (const scoreLabel of passingScoreLabels) {
    console.log(scoreLabel);
  }
} else {
  console.log('iterator-helpers-not-supported');
}
