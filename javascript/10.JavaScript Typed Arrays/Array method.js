'use strict';

// Array method.js

/** forEach() **/
const data = [1, 2, 3, 4, 5];
let sum = 0;
data.forEach((value) => {
  sum += value;
});
data.forEach(function (value, index, array) {
  array[index] = value + 1;
});
console.log(sum);
console.log(data);

/** map() **/
const a = [1, 2, 3];
const result = a.map((x) => x * x);
console.log(result);

/** filter **/
const gather = [10, 17, 35, 44, 62, 78, 95];
const selected = gather.filter((value, index, array) => value % 5 === 0);
console.log(selected);

const nums = [1, 2, 3, 4];

// forEach: 做事情
nums.forEach((x) => {
  console.log(x);
});

// map: 变成新值
const doubled = nums.map((x) => x * 2);

// filter: 判断去留
const even = nums.filter((x) => x % 2 === 0);

console.log(doubled);
console.log(even);

//sparse array
const sparse = [1, , 3];

console.log(sparse);
console.log(1 in sparse);

const dense = sparse.filter(() => true);
console.log(dense);

// clear null & undefined
const original = [1,undefined,2,null,3];
const filterResult = original.filter(value => value !== undefined && value !== null);
console.log(filterResult);

/** find() findIndex() **/
const s = [34,23,42,39,543,111,231,264,18];
const findResult = s.find(value => value % 3 === 0);
console.log(findResult);
const indexResult = s.findIndex(value => value === 231);
console.log(indexResult); //otherwise return -1

/** every() some()  **/
const modifyResult = s.filter(value => value % 3 === 0);
const everyResult = modifyResult.every(value => value < 500);
console.log(everyResult);
const someResult = modifyResult.some(value => value % 2 === 0);
console.log(someResult); //at least 1 element meet condition, return true, otherwise false
//empty Array case:
const emptyArray = [];
console.log(emptyArray.every(value => value > 0));
console.log(emptyArray.some(value => value < 0));

/** reduce() method **/
const total = s.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
},0);
console.log(total);

const winners = ["Alice","Bob","David","Bob","Alice","Bob"];
const count = winners.reduce((result, name) => {
  if (result[name] === undefined) {
    result[name] = 1;
  } else {
    result[name] += 1;
  }
  return result;
},{});
console.log(count);

const users =[
  {id:1, name:"John"},
  {id:2, name:"James"}
];

const userMap = users.reduce((result,user) => {
  result[user.id] = user;
  return result;
},{});
console.log(userMap);

/** reduceRight() **/
const values = ['a', 'b', 'c'];

const left = values.reduce((result, value) => {
  return result + value;
}, '');

const right = values.reduceRight((result, value) => {
  return result + value;
}, '');

console.log(left);
console.log(right);

/** flat() **/
const f = [1,[2,3],[4,[5,6,[7,8]]]];
const flatResult = f.flat();
const flatDepth = f.flat(2);
const thorough = f.flat(Infinity);
console.log(flatResult);
console.log(flatDepth);
console.log(thorough);

/** flatMap() **/
const sentences = ["hello world","Good morning"];
const words = sentences.flatMap(sentence => {
  return sentence.split("")
});
console.log(words);

const orders = [
  { id: 1, items: ['book', 'pen'] },
  { id: 2, items: ['mouse'] },
];

const allItems = orders.flatMap((order) => {
  return order.items;
});

console.log(allItems);

/** concat() **/
const first = [1, 2, 3];
const second = [4,5,6];
const concatResult = first.concat(second);
console.log(concatResult);

/** pop() **/
const length = concatResult.push(7,8,9);
console.log(length); // return new length, not new Array

/** push() **/
const removed = concatResult.pop();
console.log(removed);

/** shift() & unshift(); **/
const shiftResult = concatResult.shift();
console.log(shiftResult);

const unshiftResult = concatResult.unshift(10,11);
console.log(unshiftResult);

/** slice() **/
// slice(start: index ,end: index) return result include start not include end
const newNumbers =[10,20,30,40,50];
const sliceResult = newNumbers.slice(1,4);
console.log(sliceResult);
console.log(newNumbers.slice(-2));
console.log(newNumbers.slice(1,-1));

// Omit end
const omitEndResult = newNumbers.slice(2);
console.log(omitEndResult);

const copyResult = newNumbers.slice();
console.log(copyResult);
console.log(copyResult === newNumbers);

/** splice() **/
const dedicate = [24, 343, 521, 123, 901, 227, 65];

const removedFromDedicate = dedicate.splice(1, 3);

const removedByInsert = removedFromDedicate.splice(1, 0, 999, 666, 1000);

const removedByReplace = removedByInsert.splice(1, 3, 1500, 2000, 3000);

console.log(removedFromDedicate);
console.log(removedByInsert);
console.log(removedByReplace);

/** fill() **/
function createArray(length, createValue) {
  return Array.from({ length: length }, (_, index) => createValue(index));
}

const myArray = createArray(5, (index) => index + 1);

console.log(myArray);

function createEmptyArray(len, initialValue) {
  return Array.from({ length: len }, () => initialValue);
}

const functionMethod = createEmptyArray(5, 0);
const fillMethod = new Array(5).fill(0);

console.log(functionMethod);
console.log(fillMethod);


/** copyWithin() **/
const transport =  [1,2,3,4,5];
transport.copyWithin(0,3);
console.log(transport);
const transport2 = [1,2,3,4,5];
console.log(transport2.copyWithin(1,3,5)); // assign end

/** indexOf() & lastIndexOf() **/
const org = [10,20,30,40,50];
console.log(org.indexOf(20));
console.log(org.lastIndexOf(20));
console.log(org.indexOf(99));

console.log(org.indexOf(20,2));
console.log(org.lastIndexOf(20,2));

const custom = [124,232,343,329,512,983];
const index = custom.findIndex(value => value % 2 === 0);
console.log(index);

/** !!! Comparison **/
const usersInfo = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Carol', role: 'admin' },
  { id: 4, name: 'Dave', role: 'user' },
];

console.log(usersInfo.find((user) => user.role === 'admin'));
console.log(usersInfo.findIndex((user) => user.role === 'admin'));

console.log(usersInfo.findLast((user) => user.role === 'admin'));
console.log(usersInfo.findLastIndex((user) => user.role === 'admin'));

const userInfo = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
];

const value = userInfo.find((user) => user.role === 'manager');
const userIndex = usersInfo.findIndex((user) => user.role === 'manager');

const lastValue = userInfo.findLast((user) => user.role === 'manager');
const lastIndex = userInfo.findLastIndex((user) => user.role === 'manager');

console.log(value);
console.log(userIndex);
console.log(lastValue);
console.log(lastIndex);

/** includes() **/
const determineArray = [10,20,30,40,50];
console.log(determineArray.includes(99));
console.log(determineArray.includes(30));

/** sort() **/
//default sequence
const org1 = [1,10,2,20];
console.log(org1.sort());

org1.sort((x, y) => x - y);
console.log(org1);
org1.sort((x, y) => y - x);
console.log(org1);

const usersData = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
  { name: 'Carol', age: 25 },
];
usersData.sort((a,b) => {
  return a.age - b.age;
});
console.log(usersData);

/** reverse **/
const org2 = [1,2,3];
const reverseResult = org2.reverse();
console.log(reverseResult);
console.log(org2);
console.log(org2 === reverseResult);

const identicalArray = org2.slice().reverse();
console.log(org2);
console.log(identicalArray);

/** join() **/
const convert = [10,20,30,40,50];
console.log(convert.join());
console.log(convert.join("-"));
console.log(convert.join(""));
// Special Circumstance (null & undefined)
const specialArray = [1,null,undefined,4];
console.log(specialArray.join("-"));
const pathParts = ["users","profile","settings"];
const path = pathParts.join("/");
console.log(path);

/** toString() **/
const convert1 = [10,20,30,40,50];
console.log(convert1.toString());
console.log(convert1.join());

/** toLocalString() **/
const date = new Date();
console.log(date.toLocaleDateString("en-US"));
console.log(date.toLocaleTimeString("en-US"));
console.log(date.toLocaleString("en-US"));

/** Array.isArray() **/
console.log(Array.isArray([1,334,343]));
console.log(Array.isArray("hello"));

/** Array.from() **/
const chars = Array.from("hello");
console.log(chars);

const arrayLike = {
  0:"a",
  1:"b",
  length:2
};
console.fromResult = Array.from(arrayLike);
console.log(arrayLike);

function createNumberArray(length, createValue) {
  return Array.from({ length }, (_, index) => createValue(index));
}

const generator = createNumberArray(5, (index) => index);
const generator2 = createNumberArray(5, (index) => index + 1);
const generator3 = createNumberArray(5, (index) => index * index);

console.log(generator);
console.log(generator2);
console.log(generator3);


