// Goal:
// Verify that many instances can share one prototype method.

// Expected output:
// true
// Ada Lovelace
// Grace Hopper

const memberMethods = {
  getDisplayName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

function createMember(firstName, lastName) {
  const member = Object.create(memberMethods);
  member.firstName = firstName;
  member.lastName = lastName;
  return member;
}

const firstMember = createMember("Ada", "Lovelace");
const secondMember = createMember("Grace", "Hopper");

console.log(firstMember.getDisplayName === secondMember.getDisplayName);
console.log(firstMember.getDisplayName());
console.log(secondMember.getDisplayName());
