// Goal:
// Verify that string values are immutable even though characters can be read by index.

const label = 'sale';

const unchangedLabel = Function(`
  const label = "sale";
  label[0] = "S";
  return label;
`)();

console.log(unchangedLabel);
console.log(label[0]);
console.log(Array.from(label).map((letter) => letter.toUpperCase()).join(''));
