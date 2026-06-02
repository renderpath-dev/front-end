// Goal:
// Compare normal property access with descriptor inspection.

const profileRecord = {
  username: 'ada',
};

console.log(profileRecord.username);
console.log(Object.getOwnPropertyDescriptor(profileRecord, 'username'));
