"use strict"
const user = {
  name: 'Alice',
  say() {
    return this.name;
  },
};

const admin = {
  name: 'Bob',
  say: user.say,
};

console.log(user.say()); // "Alice"
console.log(admin.say()); // "Bob"

const detached = user.say;
console.log(detached()); // depends on strict mode / environment
