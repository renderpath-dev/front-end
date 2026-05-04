"use strict";

function divide(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new TypeError("divide expects two numbers");
  }

  if (y === 0) {
    throw new RangeError("divisor cannot be zero");
  }

  return x / y;
}

try {
  const result = divide(2, 0);
  console.log(result);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

function safeDivide(x, y) {
  try {
    return divide(x, y);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    return null;
  }
}

console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));

function repeatText(text, count) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  if (!Number.isInteger(count)) {
    throw new TypeError("count must be an integer");
  }

  if (count < 0) {
    throw new RangeError("count must be greater than or equal to 0");
  }

  return text.repeat(count);
}

try {
  console.log(repeatText("hi", -1));
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("repeatText finished");
}

function getRequiredUserById(users, id) {
  if (!Array.isArray(users)) {
    throw new TypeError("users must be an array");
  }

  const user = users.find(item => item.id === id);

  if (user === undefined) {
    throw new Error("User not found");
  }

  return user;
}

try {
  const users = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Linus" }
  ];

  const foundUser = getRequiredUserById(users, 3);
  console.log(foundUser.name);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
