function twice (fn) {
  return function(value) {
    return fn(fn(value));
  };
}
function increment(x) {
  return x + 1;
}
const addTwo = twice(increment);
console.log(addTwo(10));



function multiply (a,b) {
  return a * b;
}
const double = multiply.bind(null,2);
console.log(double(5));


function partialLeft (fn,...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs,laterArgs);
  };
}
function list (a,b,c) {
  return [a,b,c];
}
const withFirst = partialLeft(list,"A");
console.log(withFirst('B', 'C'));

//memoization
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function add(a, b) {
  console.log('calculate');
  return a + b;
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(2, 3));
console.log(memoizedAdd(2, 3));