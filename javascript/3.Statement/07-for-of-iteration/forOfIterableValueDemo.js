// Goal:
// Verify for...of over Set values.

const uniqueRoles = new Set(["admin", "editor", "admin"]);
const roleList = [];

for (const role of uniqueRoles) {
  roleList.push(role);
}

console.log(roleList);
