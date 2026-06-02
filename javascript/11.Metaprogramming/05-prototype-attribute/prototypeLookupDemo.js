// Goal:
// Verify how prototype lookup works.

const sharedMethods = {
  createLabel() {
    return `profile:${this.username}`;
  },
};

const profileRecord = Object.create(sharedMethods);
profileRecord.username = 'ada';

console.log(profileRecord.createLabel());
console.log(Object.hasOwn(profileRecord, 'createLabel'));
console.log(Object.getPrototypeOf(profileRecord) === sharedMethods);
