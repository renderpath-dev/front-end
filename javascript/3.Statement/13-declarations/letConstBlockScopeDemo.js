// Goal:
// Verify let and const block scope.

const outerStatus = "outer";

{
  let innerStatus = "inside block";
  const fixedStatus = "fixed";
  console.log(innerStatus);
  console.log(fixedStatus);
}

console.log(outerStatus);
