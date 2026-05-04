const x = -2;const y=3;
const pow = Math.pow(x,y);
const abs = Math.abs(x);
console.log(pow);
console.log(abs);

/** ES6 Number Attribute**/
const Number1 = abs * y;
if (Number.isNaN(Number1)) {
  console.log("Number1 is NOT a number");
} else {
  console.log(Number1);
}
if (Number.isFinite(Number1)) {
  console.log("Number1 is Finite Value")
} else {
  console.log('Numerical Value');
}
if (Number.isInteger(Number1)) {
  console.log("Number1 is Integer");
}
