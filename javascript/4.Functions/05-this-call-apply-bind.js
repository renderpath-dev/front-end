"use strict";

/** Calling Function **/
const user = {
  name: "John",
  say() {
    return this.name;
  }
};

console.log(user.say());

/** detached function call
 "use strict";

 const user = {
 name: "Ada",
 say() {
 return this.name;  // this === undefined
 }
 };

 const fn = user.say;

 console.log(fn());   // TypeError
 **/
const detached = user.say;

try {
  console.log(detached());
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

const boundSay = user.say.bind(user);
console.log(boundSay());

/** Indirect Invocation: call()  apply()  bind() **/
function introduce(city, job) {
  return `${this.name} from ${city}, ${job}`;
}

const user1 = { name: "Alex" };
const user2 = { name: "Charlie" };

console.log(introduce.call(user1, "London", "engineer"));
console.log(introduce.apply(user2, ["San Francisco", "Computer Science"]));

function greet(word) {
  return `${word}, ${this.name}`;
}

const userName = { name: "Chris" };
const boundGreet = greet.bind(userName);
console.log(boundGreet("Hello"));

/**
 * call() and apply() call immediately.
 * bind() returns a new function.
 */
function showName(prefix) {
  return `${prefix}: ${this.name}`;
}

const ada = { name: "Ada" };
const linus = { name: "Linus" };

console.log(showName.call(ada, "User"));
console.log(showName.apply(linus, ["User"]));

const boundShowName = showName.bind(ada, "Bound user");
console.log(boundShowName());
console.log(boundShowName.call(linus));

/**
 * Arrow functions ignore call(), apply(), and bind() for their own this.
 */
const arrowThis = () => this;
console.log(arrowThis.call(ada) === undefined);
