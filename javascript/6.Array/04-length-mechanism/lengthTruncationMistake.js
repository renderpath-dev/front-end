// Goal:
// Verify that assigning a smaller length deletes elements.

const releaseSteps = ['build', 'test', 'deploy', 'monitor'];

releaseSteps.length = 2;

console.log(releaseSteps);
console.log(releaseSteps[2]);
console.log(2 in releaseSteps);
