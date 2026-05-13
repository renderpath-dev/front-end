/** Generics Array**/
function firstElement<T>(arr:T[]):T {
    return arr[0];
}
const numbers = [1,2,3,4,5,6,7,8,9,10];
const firstNum = firstElement(numbers);
console.log(firstNum);

const words = ["hello", "world"];
const firstWord = firstElement(words);
console.log(firstWord);

