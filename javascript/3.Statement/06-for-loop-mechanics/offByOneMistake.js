// Goal:
// Show an off-by-one access using a guarded output.

const names = ["Ava", "Ben"];
const collected = [];

for (let index = 0; index <= names.length; index++) {
  collected.push(names[index]);
}

console.log(collected);
console.log(collected.includes(undefined));
