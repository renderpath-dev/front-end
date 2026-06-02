// Goal:
// Read the descriptor of an own property.

const accountRecord = {
  email: 'user@example.com',
};

const emailDescriptor = Object.getOwnPropertyDescriptor(accountRecord, 'email');

console.log(emailDescriptor.value);
console.log(emailDescriptor.writable);
console.log(emailDescriptor.enumerable);
console.log(emailDescriptor.configurable);
