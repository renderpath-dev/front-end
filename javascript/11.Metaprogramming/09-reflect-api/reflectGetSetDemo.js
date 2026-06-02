// Goal:
// Use Reflect.get and Reflect.set for property operations.

const profileRecord = {
  username: 'ada',
};

console.log(Reflect.get(profileRecord, 'username'));
console.log(Reflect.set(profileRecord, 'username', 'grace'));
console.log(profileRecord.username);
