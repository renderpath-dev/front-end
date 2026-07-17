// Goal:
// Show how an accidental empty statement breaks an if statement.

const isAdmin = false;
const permissionLog = [];

if (isAdmin);
{
  permissionLog.push("dangerous action executed");
}

console.log(permissionLog);
