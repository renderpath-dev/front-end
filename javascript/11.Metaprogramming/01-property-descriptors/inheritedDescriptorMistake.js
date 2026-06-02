// Goal:
// Verify that getOwnPropertyDescriptor does not inspect the prototype chain.

const baseProfileRecord = {
  role: 'admin',
};

const childProfileRecord = Object.create(baseProfileRecord);
childProfileRecord.username = 'ada';

console.log(Object.getOwnPropertyDescriptor(childProfileRecord, 'username'));
console.log(Object.getOwnPropertyDescriptor(childProfileRecord, 'role'));
console.log(childProfileRecord.role);
