function map(f,a) {
  const result = new Array(a.length);
  for (let i = 0; i <a.length; i++) {
    result [i] = f(a[i]);
  }
  return result;
}

const numbers = [0,1,2,5,10];
const cubedNumbers = map(function(x) {
  return x * x * x;
},numbers);
console.log(cubedNumbers);

//a function can be defined based on a condition
let myFunc;
let num = 0;
if (num === 0) {
  myFunc = function (theObject) {
    theObject.make = "Toyota";
  };
}
console.log(function(myFunc) {
  myFunc(myFunc);
});