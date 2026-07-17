// Goal:
// Verify that for...of reads iterable values.

const selectedTags = ["react", "node", "testing"];
const collectedTags = [];

for (const tag of selectedTags) {
  collectedTags.push(tag.toUpperCase());
}

const letters = [];
for (const character of "JS") {
  letters.push(character);
}

console.log(collectedTags);
console.log(letters);
