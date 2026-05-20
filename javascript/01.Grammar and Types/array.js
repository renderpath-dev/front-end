const numbers = [5, 12, 8, 130, 44];
function findMax(arr) {
  return Math.max(...arr);
}

function findMin(arr) {
  return Math.min(...arr);
}

console.log(findMin(numbers));
console.log(findMax(numbers));
