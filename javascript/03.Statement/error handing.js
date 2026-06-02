'use strict';

// type error
function square(x) {
  if (typeof x !== 'number') {
    throw new TypeError('square expects a number');
  }

  return x * x;
}

try {
  console.log(square('5'));
} catch (error) {
  console.log(error.message);
}

// range error
function repeatText(text, count) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }

  if (!Number.isInteger(count)) {
    throw new TypeError('count must be an integer');
  }

  if (count < 0) {
    throw new RangeError('count must be greater than or equal to 0');
  }

  return text.repeat(count);
}

try {
  console.log(repeatText('hi', -1));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

// data not found
function findUserById(users, id) {
  return users.find((user) => user.id === id);
}

const users = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Linus' },
];

const user = findUserById(users, 3);

console.log(user);

function getRequiredUserById(users, id) {
  const user = users.find((user) => user.id === id);

  if (user === undefined) {
    throw new Error('User not found');
  }

  return user;
}

try {
  const users = [
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Linus' },
  ];

  const user = getRequiredUserById(users, 3);
  console.log(user.name);
} catch (error) {
  console.log(error.message);
}



// Arrow Functions with Error Handling
const subtract = (x, y) => {
  if (typeof x !== 'number' || y !== 'number') {
    throw new TypeError('subtract expects two number');
  }
  return x - y;
};
try {
  console.log(subtract(10, '5'));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}



// Encapsulate error handling into a function.
function safeSubtract(x, y) {
  try {
    return subtract2(x, y);
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

function subtract2(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('subtract expects two numbers');
  }

  return x - y;
}

console.log(safeSubtract(10, 5));
console.log(safeSubtract(10, '5'));