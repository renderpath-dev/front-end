console.log('Enhanced Object Literals---');

console.log('Es5 attribute declaring');
// In Es5 you need to enter both object key and variable key which hold value
const name = 'one';
const age = 25;
const salary = 3500;
const emp = {
  name: name,
  age: age,
  salary: salary,
};
console.log(emp);

console.log('Es6 attribute declaring');
// In Es6 you can enter both object and variable key at once
let name1 = 'two';
let age1 = 26;
let salary1 = 5500;

let emp1 = {
  name1,
  age1,
  salary1,
};
console.log(emp1);

console.log('---');

console.log('Es5 method declaring');
// In Es5 you need to enter keyword function for declaring function inside object
const name2 = 'one';
const emp2 = {
  name: name,
  showName: function () {
    console.log(`Hello ${name2}, Welcome to this company`);
  },
};
console.log(emp2);
emp2.showName();

console.log('Es6 method declaring');
// In Es6 you don't need to enter keyword for function
let name3 = 'two';
let emp3 = {
  name3,
  showName() {
    console.log(`Hello ${name3}, Welcome to this company`);
  },
};
console.log(emp3);
emp3.showName();

console.log('---');

console.log('Es6 attribute and method declaring');
// You can directly enter attribute and method name inside object
let name4 = 'one';
let showName = () => {
  console.log(`Hello ${name4}, Welcome to this company`);
};
let emp4 = {
  name4,
  showName,
};
console.log(emp4);
emp4.showName();

console.log('---');
// In Es6 we can use dynamic attribute name
console.log('Es6 object dynamic attributes or key');

let obj_key = 'salary';
let emp5 = {
  name: 'one',
  age: 27,
  [obj_key]: 5500,
};
console.log(emp5);

console.log('---');

console.log('Es5, to return as object');
// In Es5 for returning you need to enter both object key name and value key
function emp6() {
  let name = 'one';
  let age = 25;
  return { name: name, age: age };
}
console.log(emp6());

console.log('Es6, to return as object');
// In Es6 if you enter object key, it will be takes with value

function emp7() {
  let name = 'one';
  let age = 25;
  return { name, age };
}
console.log(emp7());

console.log('---');

console.log('Es6 object declared using array');
// Dynamic object creation using shift()
let properties = ['name', 'age', 'salary'];
let emp8 = ['one', 27, 3500];

let emp1_detail = {
  [properties.shift()]: emp8.shift(),
  [properties.shift()]: emp8.shift(),
  [properties.shift()]: emp8.shift(),
};
console.log(emp1_detail);
