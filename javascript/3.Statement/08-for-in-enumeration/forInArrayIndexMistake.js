// Goal:
// Show why for...in is not array value iteration.

const items = ["book", "pen"];
items.owner = "Mira";

const visited = [];

for (const key in items) {
  visited.push(`${key}:${items[key]}`);
}

console.log(visited);
