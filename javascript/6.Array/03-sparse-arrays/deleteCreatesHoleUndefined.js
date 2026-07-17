// Goal:
// Compare a hole with an explicit undefined value.

const sparseScores = [];
sparseScores[0] = 90;
sparseScores[2] = 85;

const explicitScores = [90, undefined, 85];

console.log(sparseScores.length);
console.log(sparseScores[1]);
console.log(1 in sparseScores);
console.log(1 in explicitScores);
console.log(Object.keys(sparseScores));
console.log(Object.keys(explicitScores));
